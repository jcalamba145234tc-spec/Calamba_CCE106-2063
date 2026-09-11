import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
const COURSES = [
  { id: "101", title: "Networking 1" },
  {
    id: "102",
    title: "CCe106 - Application Development and Emerging Technologies",
  },
  { id: "103", title: "IT12 - Systems Integration & Architecture" },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back, Jake!</Text>
      <Text style={styles.summary}>
        You have {COURSES.length} active courses this term. Tap a course below
        to see its details.
      </Text>

      <Text style={styles.sectionTitle}>Your Courses</Text>
      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/course/${item.id}`} asChild>
            <Pressable style={styles.courseRow}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseArrow}>›</Text>
            </Pressable>
          </Link>
        )}
      />

      <Link href="/course/does-not-exist" style={styles.invalidLink}>
        Try an invalid course link →
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  welcome: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  summary: { fontSize: 14, color: "#555", marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#f2f7f9",
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: { fontSize: 15, color: "#1e88a8", fontWeight: "600" },
  courseArrow: { fontSize: 18, color: "#1e88a8" },
  invalidLink: { marginTop: 20, color: "#a83232", fontSize: 13 },
});
