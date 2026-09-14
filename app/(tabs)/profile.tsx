import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../_layout";

const STUDENT_ID = "5521";

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.name, { color: colors.text }]}>Jake Calamba</Text>
      <Text style={[styles.detail, { color: colors.subtext }]}>
        3rd Year · Student ID #{STUDENT_ID}
      </Text>
      <Pressable
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => router.push(`/student/${STUDENT_ID}`)}
      >
        <Text style={styles.buttonText}>View Full Student Record</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  name: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  detail: { fontSize: 14, marginBottom: 24 },
  button: { paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
