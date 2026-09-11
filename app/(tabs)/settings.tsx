import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../_layout";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const { darkMode, setDarkMode, colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Preferences
      </Text>

      <View style={[styles.row, { borderBottomColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.text }]}>
          Notifications
        </Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ true: colors.accent }}
        />
      </View>

      <View style={[styles.row, { borderBottomColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ true: colors.accent }}
        />
      </View>

      <Pressable
        style={styles.signOut}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          }
        }}
      >
        <Text style={[styles.signOutText, { color: colors.danger }]}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  label: { fontSize: 15 },
  signOut: { marginTop: 30, alignItems: "center" },
  signOutText: { fontSize: 14, fontWeight: "600" },
});
