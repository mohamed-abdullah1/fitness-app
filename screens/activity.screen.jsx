import { View, Text } from "react-native";
import styles from "../styles/global.styles";
import Button from "../components/button.component";

const Activity = () => {
    return (
        <View style={styles.flexCenter}>
            <Button
                label="Login"
                width={"80%"}
                pressFunction={() => console.log("👉", "hiiii")}
            />
            <Text style={styles.p}>Activity🚀</Text>
        </View>
    );
};
export default Activity;
