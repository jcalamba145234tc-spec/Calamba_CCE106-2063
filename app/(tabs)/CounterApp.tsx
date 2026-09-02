import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Counter initialStep={1} />
    </View>
  );
}

function Counter({ initialStep = 1 }) {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(initialStep);

  const increment = () => setCount((prev) => prev + step);

  const decrement = () => {
    setCount((prev) => (prev - step < 0 ? 0 : prev - step));
  };

  const reset = () => setCount(0);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Counter App</Text>
      <Text style={styles.counterValue}>{count}</Text>
      <Text style={styles.stepText}>Current Step: {step}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-{step}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={reset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+{step}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepConfigContainer}>
        <Text style={styles.label}>Configure Step Size:</Text>
        <View style={styles.stepButtons}>
          {[1, 5, 10].map((val) => (
            <TouchableOpacity
              key={val}
              style={[
                styles.stepButton,
                step === val && styles.activeStepButton,
              ]}
              onPress={() => setStep(val)}
            >
              <Text
                style={[
                  styles.stepButtonText,
                  step === val && styles.activeStepButtonText,
                ]}
              >
                {val}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: "85%",
    maxWidth: 350,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  counterValue: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#2f95dc",
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 24,
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
  resetButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  stepConfigContainer: {
    width: "100%",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  stepButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  stepButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  activeStepButton: {
    backgroundColor: "#333",
    borderColor: "#333",
  },
  stepButtonText: {
    color: "#333",
    fontWeight: "500",
  },
  activeStepButtonText: {
    color: "#fff",
  },
});
