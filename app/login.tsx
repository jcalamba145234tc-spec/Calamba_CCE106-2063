import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../context/auth-context";
import { DEMO_CREDENTIALS, isDemoLoginEnabled } from "../services/auth-api";

export default function LoginScreen() {
  const { login, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  async function submit() {
    clearError(); setValidationError("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) { setValidationError("Enter a valid email address."); return; }
    if (password.length < 1) { setValidationError("Enter your password."); return; }
    setLoading(true);
    try { await login(normalizedEmail, password); }
    catch { /* Error is surfaced by AuthContext. */ }
    finally { setLoading(false); }
  }

  return (
    <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.brandMark}><Text style={styles.brandInitial}>C</Text></View>
        <Text style={styles.eyebrow}>CALAMBA STUDENT PORTAL</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to access your student profile and campus services.</Text>

        <Text style={styles.label}>Email address</Text>
        <TextInput value={email} onChangeText={(v) => { setEmail(v); setValidationError(""); }} placeholder="you@school.edu" placeholderTextColor="#8B95A5" keyboardType="email-address" autoCapitalize="none" autoComplete="email" textContentType="emailAddress" editable={!loading} returnKeyType="next" style={styles.input} />
        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={(v) => { setPassword(v); setValidationError(""); }} placeholder="Enter your password" placeholderTextColor="#8B95A5" secureTextEntry autoComplete="password" textContentType="password" editable={!loading} onSubmitEditing={submit} returnKeyType="go" style={styles.input} />

        {(validationError || error) ? <Text accessibilityRole="alert" style={styles.error}>{validationError || error}</Text> : null}
        <Pressable accessibilityRole="button" disabled={loading} onPress={submit} style={({ pressed }) => [styles.button, pressed && !loading && styles.pressed, loading && styles.disabled]}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign in</Text>}
        </Pressable>
        {isDemoLoginEnabled() ? (
          <View style={styles.demoCard}>
            <Text style={styles.demoTitle}>Development demo account</Text>
            <Text style={styles.demoDetail}>Email: {DEMO_CREDENTIALS.email}</Text>
            <Text style={styles.demoDetail}>Password: {DEMO_CREDENTIALS.password}</Text>
            <Text style={styles.demoNote}>This local demo does not authenticate with the Postman API.</Text>
          </View>
        ) : null}
        <Text style={styles.footer}>Your account credentials are handled securely.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F5F8FC" }, content: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 28, paddingVertical: 42 },
  brandMark: { width: 52, height: 52, borderRadius: 16, backgroundColor: "#176B87", alignItems: "center", justifyContent: "center", marginBottom: 24 }, brandInitial: { color: "white", fontSize: 26, fontWeight: "800" },
  eyebrow: { color: "#176B87", fontSize: 11, letterSpacing: 1.6, fontWeight: "800", marginBottom: 12 }, title: { color: "#152536", fontSize: 32, lineHeight: 39, fontWeight: "800" }, subtitle: { color: "#667487", fontSize: 15, lineHeight: 23, marginTop: 9, marginBottom: 34 },
  label: { color: "#25364A", fontWeight: "700", fontSize: 13, marginBottom: 8, marginTop: 15 }, input: { backgroundColor: "white", borderColor: "#DCE4EC", borderWidth: 1, minHeight: 54, borderRadius: 12, paddingHorizontal: 15, color: "#172637", fontSize: 15 },
  error: { color: "#B42332", backgroundColor: "#FFF0F1", borderRadius: 10, overflow: "hidden", padding: 12, lineHeight: 19, marginTop: 16 }, button: { minHeight: 54, backgroundColor: "#176B87", borderRadius: 12, marginTop: 24, justifyContent: "center", alignItems: "center" }, buttonText: { color: "white", fontSize: 16, fontWeight: "800" }, pressed: { opacity: 0.84 }, disabled: { opacity: 0.7 }, footer: { color: "#788596", fontSize: 12, textAlign: "center", marginTop: 22 },
  demoCard: { marginTop: 18, borderWidth: 1, borderColor: "#C9DFE8", backgroundColor: "#EAF5F8", borderRadius: 12, padding: 14 }, demoTitle: { color: "#17566B", fontSize: 13, fontWeight: "800", marginBottom: 7 }, demoDetail: { color: "#365464", fontSize: 13, lineHeight: 20 }, demoNote: { color: "#526E7A", fontSize: 11, lineHeight: 16, marginTop: 6 },
});
