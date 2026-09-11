import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const STUDENT_ID = "145234";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Jake Calamba</Text>
      <Text style={styles.detail}>
        Year Level: 3rd Year · Student ID #{STUDENT_ID}
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push(`/student/${STUDENT_ID}`)}
      >
        <Text style={styles.buttonText}>View Full Student Record</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  name: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  detail: { fontSize: 14, color: "#555", marginBottom: 24 },
  button: {
    backgroundColor: "#1e88a8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
