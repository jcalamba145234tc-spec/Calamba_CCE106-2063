import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const STUDENTS: Record<string, { name: string; year: string }> = {
  "145234": { name: "Jake Calamba", year: "3rd Year" },
};

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const student = id ? STUDENTS[id] : undefined;

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Student record not found</Text>
        <Text style={styles.errorBody}>No record exists for id "{id}".</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{student.name}</Text>
      <Text style={styles.detail}>Year Level: {student.year}</Text>
      <Text style={styles.detail}>Student ID: {id}</Text>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back to Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  detail: { fontSize: 14, color: "#555", marginBottom: 4 },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#a83232",
    marginBottom: 8,
  },
  errorBody: { fontSize: 14, color: "#555", marginBottom: 20 },
  button: {
    marginTop: 24,
    backgroundColor: "#1e88a8",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
