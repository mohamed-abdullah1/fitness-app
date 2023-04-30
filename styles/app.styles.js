import { Platform, StatusBar, StyleSheet } from "react-native";
import colors from "../constants/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        height: "100%",
        width: "100%",
    },
    text: {
        fontFamily: "poppinsBold",
        color: colors.light,
        fontSize: 60,
    },
});
