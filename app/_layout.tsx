import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';

const legacyColors = { background: '#f8fafc', text: '#1e293b', subtext: '#64748b', border: '#e2e8f0', accent: '#2563eb', danger: '#dc2626' };
// Retained for older class exercise routes that are still in this project.
export function useTheme() { return { isDark: false, toggleDark: () => undefined, colors: legacyColors }; }

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#2563eb' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="event/[id]" options={{ title: 'Event Details' }} />
      </Stack>
    </UserProvider>
  );
}
