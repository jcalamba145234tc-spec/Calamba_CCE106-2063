import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../context/auth-context";
import { QuotesPanel } from "../../components/quotes-panel";
import { useTheme } from "../_layout";

export default function ProfileScreen() {
  const { user, logout, updateName, refreshProfile, error, clearError } = useAuth();
  const { colors } = useTheme();
  const [loggingOut, setLoggingOut] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const nameParts = (user?.name ?? "").trim().split(/\s+/);
  const [firstName, setFirstName] = useState(user?.firstName ?? nameParts[0] ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? nameParts.slice(1).join(" "));
  const displayName = user?.name || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Student";
  const initials = displayName.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();

  async function handleLogout() {
    setLoggingOut(true);
    try { await logout(); } finally { setLoggingOut(false); }
  }

  async function handleSaveName() {
    const first = firstName.trim();
    const last = lastName.trim();
    if (!first || !last) return;
    setSavingName(true);
    try { await updateName(first, last); setEditingName(false); }
    catch { /* AuthContext exposes the save error below. */ }
    finally { setSavingName(false); }
  }

  async function handleRefreshProfile() {
    setRefreshing(true);
    try { await refreshProfile(); }
    catch { /* AuthContext exposes the request error below. */ }
    finally { setRefreshing(false); }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <View style={[styles.hero, { backgroundColor: colors.accent }]}>
        <View style={styles.avatar}><Text style={styles.initials}>{initials || "S"}</Text></View>
        {editingName ? (
          <View style={styles.nameEditor}>
            <TextInput accessibilityLabel="First name" value={firstName} onChangeText={setFirstName} placeholder="First name" autoCapitalize="words" editable={!savingName} style={styles.nameInput} />
            <TextInput accessibilityLabel="Last name" value={lastName} onChangeText={setLastName} placeholder="Last name" autoCapitalize="words" editable={!savingName} style={styles.nameInput} />
            <View style={styles.nameActions}>
              <Pressable onPress={() => setEditingName(false)} disabled={savingName} style={styles.nameAction}><Text style={styles.nameCancel}>Cancel</Text></Pressable>
              <Pressable onPress={handleSaveName} disabled={savingName || !firstName.trim() || !lastName.trim()} style={[styles.nameAction, styles.nameSave]}>{savingName ? <ActivityIndicator color="#176B87" /> : <Text style={styles.nameSaveText}>Save name</Text>}</Pressable>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.name}>{user ? displayName : "Student profile"}</Text>
            {user ? <Pressable accessibilityRole="button" onPress={() => { clearError(); setFirstName(user.firstName ?? nameParts[0] ?? ""); setLastName(user.lastName ?? nameParts.slice(1).join(" ")); setEditingName(true); }} style={styles.editNameButton}><Text style={styles.editNameText}>Edit name</Text></Pressable> : null}
          </>
        )}
        <Text style={styles.email}>{user?.email || (user ? "Email not provided" : "No student information available.")}</Text>
        {user?.role ? <View style={styles.roleBadge}><Text style={styles.roleText}>{user.role}</Text></View> : null}
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Student information</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Info label="Student ID" value={user?.studentId ?? user?.id} muted={colors.subtext} strong={colors.text} />
        <Info label="Program" value={user?.program} muted={colors.subtext} strong={colors.text} />
        <Info label="Year level" value={user?.yearLevel} muted={colors.subtext} strong={colors.text} last />
      </View>

      <Pressable accessibilityRole="button" disabled={refreshing} onPress={handleRefreshProfile} style={({ pressed }) => [styles.refreshButton, pressed && !refreshing && styles.pressed, refreshing && styles.disabled]}>
        {refreshing ? <ActivityIndicator color={colors.accent} /> : <Text style={[styles.refreshText, { color: colors.accent }]}>Refresh profile</Text>}
      </Pressable>

      <QuotesPanel />

      {error ? <Pressable onPress={clearError}><Text style={styles.error}>{error}  ·  Dismiss</Text></Pressable> : null}
      <Pressable accessibilityRole="button" disabled={loggingOut} onPress={handleLogout} style={({ pressed }) => [styles.logout, pressed && styles.pressed, loggingOut && styles.disabled]}>
        {loggingOut ? <ActivityIndicator color="#B42332" /> : <Text style={styles.logoutText}>Log out</Text>}
      </Pressable>
      <Text style={[styles.note, { color: colors.subtext }]}>Your profile is loaded from the protected student account.</Text>
    </ScrollView>
  );
}

function Info({ label, value, muted, strong, last }: { label: string; value?: string | number; muted: string; strong: string; last?: boolean }) {
  return <View style={[styles.infoRow, !last && styles.divider]}><Text style={[styles.infoLabel, { color: muted }]}>{label}</Text><Text style={[styles.infoValue, { color: strong }]}>{value ?? "Not provided"}</Text></View>;
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 42 },
  hero: { borderRadius: 22, alignItems: "center", paddingHorizontal: 20, paddingTop: 28, paddingBottom: 26 },
  avatar: { height: 76, width: 76, borderRadius: 26, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.4)" },
  initials: { color: "white", fontSize: 27, fontWeight: "800" }, name: { color: "white", fontSize: 23, fontWeight: "800", marginTop: 15 }, email: { color: "rgba(255,255,255,0.82)", fontSize: 14, marginTop: 5 },
  roleBadge: { marginTop: 15, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.18)", paddingHorizontal: 14, paddingVertical: 6 }, roleText: { color: "white", fontWeight: "700", fontSize: 12 },
  editNameButton: { marginTop: 9, paddingVertical: 5, paddingHorizontal: 12 }, editNameText: { color: "white", textDecorationLine: "underline", fontSize: 13, fontWeight: "700" },
  nameEditor: { width: "100%", marginTop: 15, gap: 9 }, nameInput: { minHeight: 42, borderRadius: 9, paddingHorizontal: 11, backgroundColor: "white", color: "#172637", textAlign: "center", fontSize: 15 }, nameActions: { flexDirection: "row", justifyContent: "center", gap: 10, marginTop: 2 }, nameAction: { minWidth: 94, minHeight: 37, borderRadius: 9, justifyContent: "center", alignItems: "center", paddingHorizontal: 12 }, nameCancel: { color: "white", fontSize: 13, fontWeight: "700" }, nameSave: { backgroundColor: "white" }, nameSaveText: { color: "#176B87", fontSize: 13, fontWeight: "800" },
  sectionTitle: { marginTop: 28, marginBottom: 12, fontSize: 17, fontWeight: "800" }, card: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 16 }, infoRow: { paddingVertical: 16 }, divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#CBD4DF" }, infoLabel: { fontSize: 12, marginBottom: 5 }, infoValue: { fontSize: 15, fontWeight: "700" },
  refreshButton: { minHeight: 44, borderRadius: 12, borderWidth: 1, borderColor: "#C9DFE8", alignItems: "center", justifyContent: "center", marginTop: 12 }, refreshText: { fontSize: 14, fontWeight: "700" },
  error: { color: "#B42332", marginTop: 16, fontSize: 13 }, logout: { borderWidth: 1, borderColor: "#F0BFC4", backgroundColor: "#FFF6F6", minHeight: 52, borderRadius: 13, alignItems: "center", justifyContent: "center", marginTop: 28 }, logoutText: { color: "#B42332", fontSize: 15, fontWeight: "800" }, pressed: { opacity: 0.8 }, disabled: { opacity: 0.65 }, note: { textAlign: "center", fontSize: 12, marginTop: 15 },
});
