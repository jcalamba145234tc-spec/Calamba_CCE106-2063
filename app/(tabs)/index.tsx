import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../_layout";

const COURSES = [
  { id: "101", title: "Networking 1" },
  {
    id: "102",
    title: "CCe106 - Application Development and Emerging Technologies",
  },
  { id: "103", title: "IT12 - Systems Integration & Architecture" },
];

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.welcome, { color: colors.text }]}>
        Welcome back, Jake
      </Text>
      <Text style={[styles.summary, { color: colors.subtext }]}>
        You have {COURSES.length} active courses this term. Tap a course below
        to see its details.
      </Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Your Courses
      </Text>
      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/course/${item.id}`} asChild>
            <Pressable
              style={[styles.courseRow, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.courseTitle, { color: colors.accent }]}>
                {item.title}
              </Text>
              <Text style={[styles.courseArrow, { color: colors.accent }]}>
                ›
              </Text>
            </Pressable>
          </Link>
        )}
      />

      <Link
        href="/course/does-not-exist"
        style={[styles.invalidLink, { color: colors.danger }]}
      >
        Try an invalid course link →
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  welcome: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  summary: { fontSize: 14, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: { fontSize: 15, fontWeight: "600" },
  courseArrow: { fontSize: 18 },
  invalidLink: { marginTop: 20, fontSize: 13 },
});
