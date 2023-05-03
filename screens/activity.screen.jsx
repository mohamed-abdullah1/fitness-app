import { View, Text } from "react-native";
import styles from "../styles/global.styles";
import Button from "../components/button.component";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import {
    Entypo,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

const acc_modelJSON = require("../assets/model/acc_2model.json");
const acc_modelWeights = require("../assets/model/acc_2group1-shard1of1.bin");

const acc_loadModel = async () => {
    const run = async () => {
        await tf.ready();
    };
    run();
    console.log("model files", acc_modelJSON, acc_modelWeights);
    const model = await tf
        .loadLayersModel(bundleResourceIO(acc_modelJSON, acc_modelWeights))
        .catch((e) => {
            console.log("[LOADING ERROR] info:", e);
        });
    console.log("model", model);
    return model;
};
const prepareData = (data) => {
    console.log(data);
    const newdata = [];
    data.map(({ x, y, z }) => newdata.push([x, y, z]));
    console.log("newdata", newdata);
    console.log(data);
    return tf.tensor4d(newdata.flat(), [1, 100, 3, 1]);
};
const makePredictions = async (model, data) => {
    try {
        console.log("before Pred::");
        const predictionsdata = await model.predict(prepareData(data));
        let pred = predictionsdata.array(); //split by batch size
        return pred;
    } catch (e) {
        console.log(e);
    }
};
const activityIcons = {
    biking: <FontAwesome5 name="biking" size={24} color="white" />,
    downstairs: (
        <MaterialCommunityIcons name="stairs-box" size={24} color="white" />
    ),
    jogging: <FontAwesome5 name="running" size={24} color="white" />,
    sitting: (
        <MaterialCommunityIcons
            name="wheelchair-accessibility"
            size={24}
            color="white"
        />
    ),
    standing: <Entypo name="man" size={24} color="white" />,
    upstairs: (
        <MaterialCommunityIcons name="stairs-up" size={24} color="white" />
    ),
    walking: <Ionicons name="ios-walk-sharp" size={24} color="white" />,
};
const Activity = () => {
    const [dataAcc, setDataAcc] = useState([]);
    const [dataGyro, setDataGyro] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const [subscriptionGyro, setSubscriptionGyro] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activity, setActivity] = useState(null);
    const [results, setResults] = useState(null);
    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };
    const gyro_unsubscribe = () => {
        subscriptionGyro && subscriptionGyro.remove();
        setSubscriptionGyro(null);
    };
    const gyro_subscribe = () => {
        Gyroscope.setUpdateInterval(50);
        setDataGyro([]);
        setSubscription(
            Gyroscope.addListener((d) => {
                setDataGyro((prev) => [...prev, d]);
            })
        );
    };
    const _subscribe = () => {
        Accelerometer.setUpdateInterval(50);
        setDataAcc([]);
        setSubscription(
            Accelerometer.addListener((d) => {
                setDataAcc((prev) => [...prev, d]);
            })
        );
    };

    const onPress = () => {
        setIsLoading(true);
        _subscribe();
        gyro_subscribe();
        setTimeout(() => {
            setIsLoading(false);
            _unsubscribe();
            gyro_unsubscribe();
        }, 6000);
    };
    useEffect(() => {
        acc_loadModel().then((model) => {
            console.log("👉MODEL :: ", model);
        });
    }, []);
    useEffect(() => {
        if (dataAcc.length >= 100) {
            acc_loadModel().then((model) => {
                console;
                makePredictions(model, dataAcc.slice(0, 100)).then(
                    (predictions) => {
                        console.log("PREDICTION:", predictions[0]);

                        let statuses = [
                            "biking",
                            "downstairs",
                            "jogging",
                            "sitting",
                            "standing",
                            "upstairs",
                            "walking",
                        ];

                        // let max = Math.max(...predictions[0]);

                        const results = statuses.map((state, index) => ({
                            [state]: predictions[0][index],
                        }));
                        console.log("👉RESULTS", results);
                        let max = 0;
                        let obj;
                        setResults(results);
                        results.forEach((r) => {
                            if (max < r[Object.keys(r)[0]]) {
                                max = r[Object.keys(r)[0]];
                                obj = r;
                            }
                        });
                        console.log("👉MAX", obj, max);
                        setActivity(obj);
                    }
                );
            });
        }
    }, [isLoading]);
    const component = () => {
        if (results) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {results?.map((r, i) => (
                        <View key={i}>
                            <Text style={{ color: "white" }}>
                                {Object.keys(r)[0]} :: {Object.values(r)[0]}
                            </Text>
                        </View>
                    ))}
                    <Button
                        label="Repeat ♻️"
                        width={"100%"}
                        pressFunction={() => setResults(null)}
                    />
                </View>
            );
        }
        return <Button label="Start" width={"80%"} pressFunction={onPress} />;
    };
    return (
        <View style={styles.flexCenter}>
            {isLoading ? <ActivityIndicator /> : component()}
        </View>
    );
};
export default Activity;
