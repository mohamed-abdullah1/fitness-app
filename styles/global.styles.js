import { StyleSheet } from "react-native";
import colors from "../constants/colors";

export default StyleSheet.create({
    flexCenter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    p: {
        color: colors.light,
        fontFamily: "poppins",
    },
});
