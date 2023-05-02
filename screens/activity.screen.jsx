import { View, Text } from "react-native";
import styles from "../styles/global.styles";
import Button from "../components/button.component";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

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
