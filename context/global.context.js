import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const FitnessContext = createContext();
export const FitnessProvider = ({ children }) => {
    const getTargetFromLocalStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@storage_Key");
            console.log("👉👉👉", jsonValue);
            return jsonValue ? +JSON.parse(jsonValue)?.value : 6500;
        } catch (e) {
            // error reading value
            Alert.alert(
                "Error With Getting the Target 🥵",
                `Please Try Again Later 😥 ${e}`,
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                    },
                ],
                { cancelable: false }
            );
        }
    };
    const setTargetInLocalStorage = async (value) => {
        console.log("👉value", value);
        try {
            const jsonValue = JSON.stringify({ value });
            await AsyncStorage.setItem("@storage_Key", jsonValue);
        } catch (e) {
            Alert.alert(
                "Error With Store the Target 🥵",
                `Please Try Again Later 😥 ${e}`,
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                    },
                ],
                { cancelable: false }
            );
        }
    };
    return (
        <FitnessContext.Provider
            value={{
                getTargetFromLocalStorage,
                setTargetInLocalStorage,
            }}
        >
            {children}
        </FitnessContext.Provider>
    );
};
