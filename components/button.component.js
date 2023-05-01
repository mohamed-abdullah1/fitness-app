import { Text, View } from "react-native";
import { Pressable } from "react-native";
import styles from "../styles/global.styles";
import { StyleSheet } from "react-native";
import colors from "../constants/colors";
const Button = ({ label, width, pressFunction }) => {
    return (
        <Pressable
            onPress={pressFunction}
            style={(pressData) => [
                { width },
                pressData.pressed && {
                    backgroundColor: colors.darkSecondary,
                    opacity: 0.9,
                },
                localStyles.button,
            ]}
            android_riple={{ color: "red" }}
        >
            <Text style={[styles.p, { color: "black" }]}>{label}</Text>
        </Pressable>
    );
};
export default Button;

const localStyles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        borderRadius: 32,
        overFlow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
    },
});
