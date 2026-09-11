import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const COURSES: Record<string, { title: string; instructor: string }> = {
  "101": { title: "Networking 1", instructor: "Rosfield Atiagan" },
  "102": {
    title: "CCe106 - Application Development and Emerging Technologies",
    instructor: "L-jay Orcullo",
  },
  "103": {
    title: "IT12 - Systems Integration & Architecture",
    instructor: "Kate Bruno",
  },
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const course = id ? COURSES[id] : undefined;

  if (!course) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Course not found</Text>
        <Text style={styles.errorBody}>
          "{id}" doesn't match any course we know about.
        </Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.detail}>Instructor: {course.instructor}</Text>
      <Text style={styles.detail}>Course ID: {id}</Text>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back to Home</Text>
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
