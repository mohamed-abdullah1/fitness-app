import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import colors from "../constants/colors";
import Activity from "./activity.screen";
import Steps from "./step.screen";
import Settings from "./settings.screen";

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
                    name="Activity"
                    component={Activity}
                    options={{
                        tabBarLabel: "Recognition",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="progress-star"
                                size={24}
                                color={color}
                            />
                        ),
                        tabBarIconStyle: {
                            maxHeight: 30,
                        },
                    }}
                />
                <Tab.Screen
                    name="Steps"
                    component={Steps}
                    options={{
                        tabBarLabel: "Steps",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="run-fast"
                                color={color}
                                size={45}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        tabBarLabel: "Settings",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="ios-settings"
                                size={24}
                                color={color}
                            />
                        ),
                        tabBarIconStyle: {
                            maxHeight: 30,
                        },
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
