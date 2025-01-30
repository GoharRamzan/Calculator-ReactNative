import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";

export default function MyKeyboard() {
    const [input, setInput] = React.useState("");
    const [result, setResult] = React.useState<string | null>(null);

    const handleNumberPress = (buttonValue: string) => {
        setInput((prev) => prev + buttonValue);
    };

    const handleOperationPress = (operation: string) => {
        if (input !== "" && !["+","-","*","/"].includes(input.slice(-1))) {
            setInput(input + operation);
        }
    };

    const handleEqualPress = () => {
        try {
            if (input === "" || ["+", "-", "*", "/"].includes(input.slice(-1))) return;
            const evaluatedResult = eval(input);
            setResult(evaluatedResult.toString());
        } catch (error) {
            setResult(null);
        }
    };

    const handleClear = () => {
        setInput("");
        setResult(null);
    };

    const handleBackspace = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const handlePercentage = () => {
        if (input) {
            setInput((parseFloat(input) / 100).toString());
        }
    };

    const handlePlusMinus = () => {
        if (input) {
            setInput((parseFloat(input) * -1).toString());
        }
    };

    return (
        <View style={Styles.viewBottom}>
            {/* Full expression show karega */}
            <View style={{ height: 80, width: "90%", justifyContent: "flex-end", alignSelf: "center" }}>
                <Text style={[Styles.screenFirstNumber, { fontSize: 30, color: "#888" }]}>{input || "0"}</Text>
            </View>

            {/* Result separate dikhai dega */}
            {result !== null && (
                <View style={{ height: 50, width: "90%", justifyContent: "flex-end", alignSelf: "center" }}>
                    <Text style={[Styles.screenFirstNumber, { fontSize: 40, color: "#888" }]}>= {result}</Text>
                </View>
            )}

            <View style={Styles.row}>
                <Button title="C" isGray onPress={handleClear} />
                <Button title="+/-" isGray onPress={handlePlusMinus} />
                <Button title="%" isGray onPress={handlePercentage} />
                <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
            </View>

            <View style={Styles.row}>
                <Button title="7" onPress={() => handleNumberPress("7")} />
                <Button title="8" onPress={() => handleNumberPress("8")} />
                <Button title="9" onPress={() => handleNumberPress("9")} />
                <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
            </View>

            <View style={Styles.row}>
                <Button title="4" onPress={() => handleNumberPress("4")} />
                <Button title="5" onPress={() => handleNumberPress("5")} />
                <Button title="6" onPress={() => handleNumberPress("6")} />
                <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
            </View>

            <View style={Styles.row}>
                <Button title="1" onPress={() => handleNumberPress("1")} />
                <Button title="2" onPress={() => handleNumberPress("2")} />
                <Button title="3" onPress={() => handleNumberPress("3")} />
                <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
            </View>

            <View style={Styles.row}>
                <Button title="." onPress={() => handleNumberPress(".")} />
                <Button title="0" onPress={() => handleNumberPress("0")} />
                <Button title="⌫" onPress={handleBackspace} />
                <Button title="=" isBlue onPress={handleEqualPress} />
            </View>
        </View>
    );
}
