import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCurrentUser, loginUser, type UserProfile } from '@/services/authService';
import { deleteToken, getToken, saveToken } from '@/storage/tokenStorage';

const FALLBACK_VALUE = 'Not provided';

export default function HomeScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const token = await getToken();
        if (!token) return;

        const currentUser = await getCurrentUser(token);
        if (isMounted) setProfile(currentUser);
      } catch (err) {
        if (err instanceof Error && err.message === 'AUTH_PROFILE_FAILED') {
          await deleteToken().catch(() => undefined);
          if (isMounted) setError('Your session has expired. Please sign in again.');
        } else if (isMounted) {
          setError('Could not restore your session. Please try signing in.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void restoreSession();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogin() {
    setError('');
    setLoading(true);
    try {
      const data = await loginUser(username.trim(), password);
      await saveToken(data.accessToken);
      const currentUser = await getCurrentUser(data.accessToken);
      setProfile(currentUser);
    } catch (err) {
      await deleteToken().catch(() => undefined);
      setProfile(null);
      if (err instanceof Error && err.message === 'LOGIN_FAILED') {
        setError('Login failed. Check your username and password.');
      } else {
        setError('Unable to sign in right now. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await deleteToken();
      setProfile(null);
      setError('');
    } catch {
      setError('Could not log out securely. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#5A4DB4" />
        <Text style={styles.loadingText}>Checking your secure session…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {profile ? (
            <View style={styles.profileCard}>
              <View style={styles.profileHero}>
                {profile.image ? (
                  <Image source={{ uri: profile.image }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarFallbackText}>{profile.firstName?.charAt(0) || 'U'}</Text>
                  </View>
                )}
                <Text style={styles.accountBadge}>●  ACCOUNT VERIFIED</Text>
                <Text style={styles.profileName}>
                  {[profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Your profile'}
                </Text>
                <Text style={styles.profileUsername}>@{profile.username || 'user'}</Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.detailsHeading}>PROFILE DETAILS</Text>
                {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
                <ProfileRow label="Full name" value={[profile.firstName, profile.lastName].filter(Boolean).join(' ') || FALLBACK_VALUE} />
                <ProfileRow label="Username" value={profile.username || FALLBACK_VALUE} />
                <ProfileRow label="Email address" value={profile.email || FALLBACK_VALUE} />
                <ProfileRow label="User ID" value={profile.id != null ? String(profile.id) : FALLBACK_VALUE} />
                <Pressable
                  accessibilityRole="button"
                  onPress={handleLogout}
                  style={({ pressed }) => [styles.logoutButton, pressed && styles.buttonPressed]}>
                  <Text style={styles.logoutIcon}>↪</Text>
                  <Text style={styles.logoutButtonText}>Log out of account</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.loginCard}>
              <View style={styles.loginHero}>
                <View style={styles.brandMark}>
                  <Text style={styles.brandMarkText}>SP</Text>
                </View>
                <Text style={styles.eyebrow}>CCE106  /  SECURE ACCESS</Text>
                <Text style={styles.title}>Welcome back.</Text>
                <Text style={styles.subtitle}>Sign in to continue to your private profile.</Text>
              </View>
              <View style={styles.loginBody}>
                {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
                <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  accessibilityLabel="Username"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  onChangeText={setUsername}
                  placeholder="Enter your username"
                  placeholderTextColor="#82918C"
                  returnKeyType="next"
                  style={styles.input}
                  value={username}
                />
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordField}>
                  <TextInput
                    accessibilityLabel="Password"
                    autoCapitalize="none"
                    editable={!loading}
                    onChangeText={setPassword}
                    onSubmitEditing={handleLogin}
                    placeholder="Enter your password"
                    placeholderTextColor="#82918C"
                    returnKeyType="done"
                    secureTextEntry={!showPassword}
                    style={[styles.input, styles.passwordInput]}
                    value={password}
                  />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                    onPress={() => setShowPassword((visible) => !visible)}
                    style={styles.passwordToggle}>
                    <Text style={styles.passwordToggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
                  </Pressable>
                </View>
                <Pressable
                  accessibilityRole="button"
                  disabled={loading}
                  onPress={handleLogin}
                  style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed, loading && styles.buttonDisabled]}>
                  {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Sign in  →</Text>}
                </Pressable>
                <Text style={styles.helper}>🔒  Encrypted session stored on this device</Text>
                </View>
              </View>
            </View>
          )}
          <Text style={styles.footer}>{profile ? 'SECURE PROFILE  •  CCE106' : 'PROTECTED PROFILE ACCESS  •  DUMMYJSON API'}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.profileRow}>
      <View style={styles.profileRowIcon}><Text style={styles.profileRowIconText}>{label === 'User ID' ? '#' : '@'}</Text></View>
      <View style={styles.profileRowCopy}>
        <Text style={styles.profileLabel}>{label}</Text>
        <Text style={styles.profileValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#F2F1FA' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F1FA', gap: 14 },
  loadingText: { color: '#5E5B70', fontSize: 15 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  loginCard: { width: '100%', maxWidth: 460, alignSelf: 'center', backgroundColor: '#FFFFFF', borderRadius: 26, overflow: 'hidden', shadowColor: '#26213C', shadowOpacity: 0.13, shadowRadius: 28, shadowOffset: { width: 0, height: 14 }, elevation: 5 },
  loginHero: { backgroundColor: '#26213C', paddingHorizontal: 26, paddingTop: 27, paddingBottom: 24 },
  brandMark: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#B8F36B', marginBottom: 25 },
  brandMarkText: { color: '#26213C', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 },
  eyebrow: { color: '#B8F36B', fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 10 },
  title: { color: '#FFFFFF', fontSize: 31, fontWeight: '800', letterSpacing: -0.8 },
  subtitle: { color: '#C4C0D2', fontSize: 14, lineHeight: 21, marginTop: 7 },
  loginBody: { padding: 26 },
  form: { gap: 10 },
  label: { color: '#353146', fontSize: 12, fontWeight: '700', marginTop: 5, letterSpacing: 0.2 },
  input: { height: 54, borderRadius: 12, borderWidth: 1, borderColor: '#E3E1E9', backgroundColor: '#F8F8FA', paddingHorizontal: 15, color: '#26213C', fontSize: 15 },
  passwordField: { position: 'relative', justifyContent: 'center' },
  passwordInput: { paddingRight: 70 },
  passwordToggle: { position: 'absolute', right: 15, height: 52, justifyContent: 'center', paddingHorizontal: 4 },
  passwordToggleText: { color: '#5A4DB4', fontSize: 13, fontWeight: '800' },
  primaryButton: { height: 56, borderRadius: 12, backgroundColor: '#B8F36B', alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  primaryButtonText: { color: '#26213C', fontSize: 15, fontWeight: '800' },
  buttonPressed: { opacity: 0.88 },
  buttonDisabled: { opacity: 0.65 },
  helper: { color: '#817D91', fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 8 },
  error: { color: '#A33F55', backgroundColor: '#FFF0F3', borderRadius: 12, padding: 12, fontSize: 14, lineHeight: 20, marginBottom: 16 },
  profileCard: { width: '100%', maxWidth: 460, alignSelf: 'center', backgroundColor: '#F5F3ED', borderRadius: 25, overflow: 'hidden', shadowColor: '#34302A', shadowOpacity: 0.12, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 4 },
  profileHero: { alignItems: 'center', backgroundColor: '#D7F0B4', paddingTop: 30, paddingBottom: 27, paddingHorizontal: 22 },
  avatar: { width: 84, height: 84, borderRadius: 27, backgroundColor: '#F7F5EE', marginBottom: 12, borderWidth: 3, borderColor: '#FFFFFF' },
  avatarFallback: { width: 84, height: 84, borderRadius: 27, backgroundColor: '#F7F5EE', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 3, borderColor: '#FFFFFF' },
  avatarFallbackText: { color: '#3E5130', fontSize: 34, fontWeight: '800' },
  accountBadge: { color: '#4A6333', fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginBottom: 9 },
  profileName: { color: '#252820', fontSize: 25, fontWeight: '800', letterSpacing: -0.5, textAlign: 'center' },
  profileUsername: { color: '#5E6D4D', fontSize: 14, marginTop: 5 },
  profileDetails: { padding: 23, gap: 11 },
  detailsHeading: { color: '#737668', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 3 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 14, backgroundColor: '#FFFFFF', borderRadius: 14 },
  profileRowIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#EDF4E4', alignItems: 'center', justifyContent: 'center' },
  profileRowIconText: { color: '#54713A', fontSize: 16, fontWeight: '800' },
  profileRowCopy: { flex: 1, gap: 3 },
  profileLabel: { color: '#85877D', fontSize: 11, fontWeight: '600' },
  profileValue: { color: '#292C24', fontSize: 14, fontWeight: '700' },
  logoutButton: { height: 52, borderRadius: 14, backgroundColor: '#292C24', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 8 },
  logoutIcon: { color: '#D7F0B4', fontSize: 18, fontWeight: '800' },
  logoutButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  footer: { color: '#9692A5', fontSize: 10, fontWeight: '700', letterSpacing: 1, textAlign: 'center', marginTop: 18 },
});
