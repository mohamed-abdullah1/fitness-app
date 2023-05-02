import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import styles from "./styles/app.styles";
import Main from "./screens/main.screen";
import { FitnessProvider } from "./context/global.context";

export default function App() {
    //font stablish
    const [fontsLoaded] = useFonts({
        pathWay: require("./assets/fonts/pathWay/PathwayExtreme_14pt_Condensed-Medium.ttf"),
        poppins: require("./assets/fonts/poppins/Poppins-Regular.ttf"),
        poppinsBold: require("./assets/fonts/poppins/Poppins-Bold.ttf"),
    });
    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }
    return (
        <SafeAreaView style={styles.container}>
            <FitnessProvider>
                <Main />
            </FitnessProvider>
            <StatusBar style="light" />
        </SafeAreaView>
    );
}
