import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

const colors = {
  ink: "#1F2A44",
  paper: "#F6F4EF",
  surface: "#FFFFFF",
  muted: "#6B7280",
  border: "#E7E3D8",
  gold: "#B98A2E",
  sage: "#4F7566",
  white: "#FFFFFF",
};

const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
const radius = { sm: 8, md: 14, pill: 999 };

const type = {
  title: { fontSize: 26, fontWeight: "700" as const },
  sectionLabel: { fontSize: 15, fontWeight: "600" as const },
  metricValue: { fontSize: 28, fontWeight: "700" as const },
  metricLabel: { fontSize: 13, fontWeight: "500" as const },
  body: { fontSize: 15, fontWeight: "400" as const },
  caption: { fontSize: 13, fontWeight: "400" as const },
};

const METRICS = [
  {
    label: "GPA",
    value: "1.42",
    note: "Top 15% of class",
    tone: "positive" as const,
  },
  { label: "Attendance", value: "96%", note: "This semester" },
  { label: "Pending tasks", value: "3", note: "2 due this week" },
];

const ACTIVITY = [
  { title: "Submitted: IT12 Case Study", time: "Today, 9:40 AM" },
  { title: "Graded: CCe106 Quiz 2 — 92%", time: "Yesterday, 4:15 PM" },
  { title: "Enrolled: Networking 1 Lab", time: "Mon, 8:02 AM" },
];

function MetricCard({
  label,
  value,
  note,
  tone = "neutral",
  basis,
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "neutral" | "positive";
  basis: number;
}) {
  return (
    <View style={[styles.card, { flexBasis: basis, flexGrow: 1 }]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text
        style={[
          styles.metricValue,
          tone === "positive" && styles.metricValuePositive,
        ]}
      >
        {value}
      </Text>
      {note ? <Text style={styles.metricNote}>{note}</Text> : null}
    </View>
  );
}

function QuickAction({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pill, pressed && styles.pillPressed]}
    >
      <Text style={styles.pillLabel}>{label}</Text>
    </Pressable>
  );
}

function ActivityRow({ title, time }: { title: string; time: string }) {
  return (
    <View style={styles.activityRow}>
      <View style={styles.accentBar} />
      <View style={styles.activityTextGroup}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );
}

function useMetricColumns() {
  const { width } = useWindowDimensions();
  const horizontalPadding = spacing.lg * 2;
  const gap = spacing.md;

  const columns = width < 380 ? 1 : width < 700 ? 2 : 3;
  const contentWidth = width - horizontalPadding;
  const cardWidth = (contentWidth - gap * (columns - 1)) / columns;

  return { cardWidth, gap };
}

export default function DashboardScreen() {
  const { cardWidth, gap } = useMetricColumns();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Wednesday, September 16</Text>
          <Text style={styles.title}>Good morning, Jake</Text>
        </View>
        <Pressable style={styles.avatar}>
          <Text style={styles.avatarInitial}>J</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.metricRow, { gap }]}>
          {METRICS.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              note={metric.note}
              tone={metric.tone}
              basis={cardWidth}
            />
          ))}
        </View>

        <Text style={styles.sectionLabel}>Quick actions</Text>
        <View style={styles.pillRow}>
          <QuickAction
            label="View grades"
            onPress={() =>
              Alert.alert(
                "View grades",
                "This will open your full grade report.",
              )
            }
          />
          <QuickAction
            label="Course schedule"
            onPress={() =>
              Alert.alert(
                "Course schedule",
                "This will open your weekly class schedule.",
              )
            }
          />
          <QuickAction
            label="Message adviser"
            onPress={() =>
              Alert.alert(
                "Message adviser",
                "This will start a message to your adviser.",
              )
            }
          />
        </View>

        <Text style={styles.sectionLabel}>Recent activity</Text>
        <View style={styles.activityCard}>
          {ACTIVITY.map((item) => (
            <ActivityRow key={item.title} title={item.title} time={item.time} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  header: {
    backgroundColor: colors.ink,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eyebrow: {
    ...type.caption,
    color: "rgba(255,255,255,0.6)",
    marginBottom: spacing.xs,
  },
  title: { ...type.title, color: colors.white },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: { color: colors.ink, fontWeight: "700", fontSize: 17 },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.lg, paddingBottom: spacing.xl },
  metricRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...type.sectionLabel,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  activityCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minWidth: 140,
  },
  metricLabel: {
    ...type.metricLabel,
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  metricValue: { ...type.metricValue, color: colors.ink },
  metricValuePositive: { color: colors.sage },
  metricNote: { ...type.caption, color: colors.muted, marginTop: spacing.xs },
  pill: {
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  pillPressed: { backgroundColor: colors.border, opacity: 0.85 },
  pillLabel: { ...type.body, color: colors.ink, fontWeight: "600" },
  activityRow: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: spacing.sm,
  },
  accentBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: colors.gold,
    marginRight: spacing.md,
  },
  activityTextGroup: { flex: 1, paddingVertical: spacing.xs },
  activityTitle: { ...type.body, color: colors.ink },
  activityTime: { ...type.caption, color: colors.muted, marginTop: 2 },
});
