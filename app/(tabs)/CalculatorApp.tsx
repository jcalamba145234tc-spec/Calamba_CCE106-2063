import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const validateAndCalculate = (operation) => {
    setError("");
    setResult(null);

    
    if (num1.trim() === "" || num2.trim() === "") {
      setError("Please provide both numeric values.");
      return;
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    
    if (isNaN(n1) || isNaN(n2)) {
      setError("Please enter valid numbers.");
      return;
    }

    let calcResult = 0;
    switch (operation) {
      case "add":
        calcResult = n1 + n2;
        break;
      case "subtract":
        calcResult = n1 - n2;
        break;
      case "multiply":
        calcResult = n1 * n2;
        break;
      case "divide":
        if (n2 === 0) {
          setError("Error: Division by zero is not permitted.");
          return;
        }
        calcResult = n1 / n2;
        break;
      default:
        return;
    }

    setResult(calcResult);
  };

  const clearAll = () => {
    setNum1("");
    setNum2("");
    setResult(null);
    setError("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calculator App</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter first number"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={num1}
          onChangeText={setNum1}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter second number"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={num2}
          onChangeText={setNum2}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {result !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Result</Text>
            <Text style={styles.resultValue}>{result}</Text>
          </View>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => validateAndCalculate("add")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => validateAndCalculate("subtract")}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => validateAndCalculate("multiply")}
          >
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => validateAndCalculate("divide")}
          >
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
    color: "#333",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  resultContainer: {
    backgroundColor: "#eef6fc",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 14,
    color: "#555",
  },
  resultValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2f95dc",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2f95dc",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
