import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../_layout";

const COURSES: Record<string, { title: string; instructor: string }> = {
  "101": { title: "Networking 1", instructor: "TBD" },
  "102": {
    title: "CCe106 - Application Development and Emerging Technologies",
    instructor: "TBD",
  },
  "103": {
    title: "IT12 - Systems Integration & Architecture",
    instructor: "TBD",
  },
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();

  const course = id ? COURSES[id] : undefined;

  if (!course) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorTitle, { color: colors.danger }]}>
          Course not found
        </Text>
        <Text style={[styles.errorBody, { color: colors.subtext }]}>
          {id} does not match any course we know about.
        </Text>
        <Pressable
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{course.title}</Text>
      <Text style={[styles.detail, { color: colors.subtext }]}>
        Instructor: {course.instructor}
      </Text>
      <Text style={[styles.detail, { color: colors.subtext }]}>
        Course ID: {id}
      </Text>
      <Pressable
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  detail: { fontSize: 14, marginBottom: 4 },
  errorTitle: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  errorBody: { fontSize: 14, marginBottom: 20 },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
