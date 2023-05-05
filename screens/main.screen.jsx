import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import colors from "../constants/colors";

import Steps from "./step.screen";

const Tab = createBottomTabNavigator();
const Temp = () => {
  return (
    <View>
      <Text>Hello !!</Text>
    </View>
  );
};
export default function Main() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        initialRouteName="Notifications"
        screenOptions={{
          tabBarActiveBackgroundColor: colors.primary,
          tabBarInactiveBackgroundColor: colors.primary,
          tabBarActiveTintColor: colors.secondary,
          header: () => {},

          tabBarStyle: {
            height: 60,
            borderTopWidth: 0,
            marginBottom: 8,
          },
        }}
      >
        <Tab.Screen
          name="Steps"
          component={Steps}
          options={{
            tabBarLabel: "Steps",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="run-fast" color={color} size={45} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
