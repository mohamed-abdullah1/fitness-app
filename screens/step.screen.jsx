import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../styles/global.styles";
import colors from "../constants/colors";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";
import { floor } from "react-native-reanimated";

const Steps = () => {
  const [pedometerAvailability, setPedometerAvailability] = useState("");
  const [stepCount, setStepCount] = useState(0);

  let dist = (stepCount / 1300).toFixed(4);
  let cal = (dist * 60).toFixed(4);

  useEffect(() => {
    calc();
  }, []);

  calc = () => {
    const calculator = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },
      (error) => {
        setPedometerAvailability(error);
      }
    );
  };
  return (
    <View style={[styles.flexCenter, { flex: 1 }]}>
      <Text style={styles.p}>Steps♻️</Text>
      <Text style={styles.p}>
        pedometerAvailability=: {pedometerAvailability}
      </Text>

      <View style={{ flex: 3 }}>
        <CircularProgress
          value={stepCount}
          maxValue={6500}
          radius={175}
          textColor={colors.light}
          activeStrokeColor={colors.secondary}
          inActiveStrokeColor={colors.tertiary}
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={12}
          activeStrokeWidth={15}
          title={"Step count"}
          titleColor={colors.light}
          titleStyle={{ fontWeight: "bold" }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.p}>Target : 6500 steps(5Kms)</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.p}>Distance Covered : {dist} Km</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.p}>Calories Burnt : {cal} cal</Text>
        </View>
      </View>
    </View>
  );
};
export default Steps;
