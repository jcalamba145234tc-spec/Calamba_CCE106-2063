import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../_layout";

const STUDENTS: Record<string, { name: string; year: string }> = {
  "5521": { name: "Jake Calamba", year: "3rd Year" },
};

const AVATAR_URL =
  "https://api.dicebear.com/7.x/initials/png?seed=Jake%20Calamba&backgroundColor=1e88a8";

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();

  const student = id ? STUDENTS[id] : undefined;

  if (!student) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorTitle, { color: colors.danger }]}>
          Student record not found
        </Text>
        <Text style={[styles.errorBody, { color: colors.subtext }]}>
          No record exists for id {id}.
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
      <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
      <Text style={[styles.title, { color: colors.text }]}>{student.name}</Text>
      <Text style={[styles.detail, { color: colors.subtext }]}>
        {student.year}
      </Text>
      <Text style={[styles.detail, { color: colors.subtext }]}>
        Student ID: {id}
      </Text>
      <Pressable
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Back to Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
    marginTop: 8,
    backgroundColor: "#eee",
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  detail: { fontSize: 14, marginBottom: 4 },
  errorTitle: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  errorBody: { fontSize: 14, marginBottom: 20 },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
