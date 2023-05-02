import { View, Text } from "react-native";
import styles from "../styles/global.styles";
import { TextInput } from "react-native";
import colors from "../constants/colors";
import Button from "../components/button.component";
import { useContext, useState } from "react";
import { FitnessContext } from "../context/global.context";
import { Alert } from "react-native";
const Settings = ({ navigation }) => {
    const [input, setInput] = useState(0);
    const { setTargetInLocalStorage } = useContext(FitnessContext);

    const pressHandler = () => {
        if (input) {
            setTargetInLocalStorage(input);
            navigation.navigate("Steps");
        } else {
            Alert.alert(
                "Problem🥵",
                "You must enter a number of steps",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                    },
                ],
                { cancelable: true }
            );
        }
    };
    return (
        <View style={styles.flexCenter}>
            <TextInput
                style={{
                    height: 60,
                    margin: 12,
                    borderWidth: 1,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    backgroundColor: colors.light,
                    width: "80%",
                    borderRadius: 8,
                    marginBottom: 16,
                }}
                keyboardType="numeric"
                placeholder="Enter Target"
                onChangeText={(number) => setInput(number)}
            />
            <Button
                label="Update Target"
                pressFunction={pressHandler}
                width={"70%"}
            />
        </View>
    );
};
export default Settings;
