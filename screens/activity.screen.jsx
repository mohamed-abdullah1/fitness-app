import { View, Text } from "react-native";
import styles from "../styles/global.styles";
import Button from "../components/button.component";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

const acc_modelJSON = require("../assets/acc/acc_model.json");
const acc_modelWeights = require("../assets/acc/acc_group1-shard1of1.bin");

const acc_loadModel = async () => {
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
    return tf.tensor3d(data, [100, 3, 1]);
};
const makePredictions = async (model, data) => {
    try {
        console.log("before Pred::");
        const predictionsdata = await model.predict(prepareData(data));
        // let pred = predictionsdata.array(); //split by batch size
        return predictionsdata;
    } catch (e) {
        console.log(e);
    }
};

const Activity = () => {
    const [dataAcc, setDataAcc] = useState([]);
    const [dataGyro, setDataGyro] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const [subscriptionGyro, setSubscriptionGyro] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        // if (dataAcc.length >= 100) {
        //     acc_loadModel().then((model) => {
        //         console
        //         makePredictions(model, dataAcc.slice(0, 100)).then(
        //             (predictions) => {
        //                 console.log("PREDICTION:", predictions);
        //             }
        //         );
        //     });
        // }
        console.log(
            "👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉👉",
            {
                isLoading,
                dataAcc,
                length: dataAcc.length,
                dataGyro,
                gyroLength: dataGyro.length,
            }
        );
    }, [isLoading]);

    return (
        <View style={styles.flexCenter}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <Button
                    label="Start Detecting My Activity"
                    width={"80%"}
                    pressFunction={onPress}
                />
            )}
        </View>
    );
};
export default Activity;
