import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../styles/global.styles";
import colors from "../constants/colors";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Steps = () => {
  const [pedometerAvailability, setPedometerAvailability] = useState("");
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    calc();

    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@step_count");
        setStepCount(jsonValue !== null ? JSON.parse(jsonValue).stepCount : 0);
      } catch (e) {
        // error reading value
      }
    })();
    //cleanup
    return () => {
      (async () => {
        try {
          const jsonValue = JSON.stringify({ stepCount });
          await AsyncStorage.setItem("@step_count", jsonValue);
        } catch (e) {
          // saving error
          console.error(e);
        }
      })();
    };
  }, []);

  const calc = () => {
    Pedometer.watchStepCount((result) => {
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
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            top: 140,
          }}
        >
          <FontAwesome5 name="walking" size={40} color={colors.light} />
        </View>
        <CircularProgress
          value={stepCount}
          maxValue={6500}
          radius={175}
          progressValueStyle={{
            color: colors.light,
            fontFamily: "poppins",
            marginBottom: 12,
            marginTop: 12,
          }}
          activeStrokeColor={colors.secondary}
          inActiveStrokeColor={colors.tertiary}
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={12}
          activeStrokeWidth={15}
          title={`GOAL 6,500`}
          titleColor={colors.tertiary}
          titleStyle={{
            fontSize: 18,
            fontFamily: "poppins",
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderColor: colors.tertiary,
              borderWidth: 2,
              borderRadius: 100,
              flexWrap: "wrap",
              width: 50,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 4,
            }}
          >
            <FontAwesome5
              style={{
                marginLeft: 2,
              }}
              name="fire-alt"
              size={24}
              color={colors.light}
            />
          </View>
          <Text style={styles.p}>
            {Math.round(((stepCount / 1300).toFixed(2) * 60).toFixed(4))} cal
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderColor: colors.tertiary,
              borderWidth: 2,
              borderRadius: 100,
              flexWrap: "wrap",
              width: 50,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 4,
            }}
          >
            <FontAwesome name="space-shuttle" size={24} color={colors.light} />
          </View>
          <Text style={styles.p}>
            {Math.round((stepCount / 1300).toFixed(2))} Km
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderColor: colors.tertiary,
              borderWidth: 2,
              borderRadius: 100,
              flexWrap: "wrap",
              width: 50,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 4,
            }}
          >
            <MaterialCommunityIcons
              name="target"
              size={24}
              color={colors.light}
            />
          </View>
          <Text style={styles.p}>6,500 steps</Text>
        </View>
      </View>
    </View>
  );
};
export default Steps;
