import { StyleSheet } from "react-native";
import colors from "../constants/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontFamily: "poppinsBold",
        color: colors.light,
        fontSize: 60,
    },
});
