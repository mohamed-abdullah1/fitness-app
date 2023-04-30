import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import styles from "./styles/app.styles";
export default function App() {
    //font stablish
    const [fontsLoaded] = useFonts({
        pathWay: require("./assets/fonts/pathWay/PathwayExtreme_14pt_Condensed-Medium.ttf"),
        poppins: require("./assets/fonts/poppins/Poppins-Regular.ttf"),
        poppinsBold: require("./assets/fonts/poppins/Poppins-Bold.ttf"),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text style={styles.text}>0</Text>
            <StatusBar style="auto" />
        </View>
    );
}
