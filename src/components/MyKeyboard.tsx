import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from '../styles/Color';

export default function MyKeyboard() {
    const [firstNumber, setFirstNumber] = React.useState("");
    const [secondNumber, setSecondNumber] = React.useState("");
    const [operation, setOperation] = React.useState("");
    const [result, setResult] = React.useState<Number | null>(null);

    const handleNumberPress = (buttonValue: string) => {
        if (firstNumber.length < 10) {
            setFirstNumber(firstNumber + buttonValue);
        }
    };

    const handleOperationPress = (buttonValue: string) => {
        if (buttonValue === "=") {
            getResult();
        } else {
            setOperation(buttonValue);
            setSecondNumber(firstNumber);
            setFirstNumber("");
        }
    };

    const clear = () => {
        setFirstNumber("");
        setSecondNumber("");
        setOperation("");
        setResult(null);
    };

    const getResult = () => {
        let calculatedResult: number | null = null;

        switch (operation) {
            case "+":
                calculatedResult = parseFloat(secondNumber) + parseFloat(firstNumber);
                break;
            case "-":
                calculatedResult = parseFloat(secondNumber) - parseFloat(firstNumber);
                break;
            case "*":
                calculatedResult = parseFloat(secondNumber) * parseFloat(firstNumber);
                break;
            case "/":
                if (parseFloat(firstNumber) === 0) {
                    calculatedResult = null; // Handle division by zero
                } else {
                    calculatedResult = parseFloat(secondNumber) / parseFloat(firstNumber);
                }
                break;
            default:
                calculatedResult = 0;
                break;
        }

        // Set result only if calculatedResult is not null
        if (calculatedResult !== null) {
            setResult(calculatedResult);
        } else {
            setResult(0);
        }

        // Clear state after result is set
        setFirstNumber("");
        setSecondNumber("");
        setOperation("");
    };

    const firstNumberDisplay = () => {
        if (result !== null) {
            // Safely compare `result` by ensuring it's a number
            const resultNumber = Number(result); // Ensure result is a number
            const displayStyle = resultNumber < 99999
                ? [Styles.screenFirstNumber, { color: myColors.result }]
                : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }];
    
            return (
                <Text style={displayStyle}>
                    {resultNumber.toString()}
                </Text>
            );
        }
    
        // Handle the case where firstNumber is empty
        if (firstNumber === "") {
            return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
        }
    
        // Determine font size based on the length of firstNumber
        const fontSize = firstNumber.length > 7
            ? 50
            : firstNumber.length > 5
            ? 70
            : undefined; // Use default style if none of the conditions match
    
        return (
            <Text style={[Styles.screenFirstNumber, fontSize ? { fontSize } : {}]}>
                {firstNumber}
            </Text>
        );
    };
    

    return (
        <View style={Styles.viewBottom}>
            <View style={{
                height: 120,
                width: '90%',
                justifyContent: 'flex-end',
                alignSelf: "center"
            }}>
                <Text style={Styles.screenSecondNumber}>
                    {secondNumber}
                    <Text style={{ color: 'purple', fontSize: 50, fontWeight: '500' }}>
                        {operation}
                    </Text>
                </Text>
                {firstNumberDisplay()}
            </View>
            <View style={Styles.row}>
                <Button title="C" isGray onPress={clear} />
                <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
                <Button title="%" isGray onPress={() => handleOperationPress("%")} />
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
                <Button title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
                <Button title="=" isBlue onPress={() => handleOperationPress("=")} />
            </View>
        </View>
    );
}
