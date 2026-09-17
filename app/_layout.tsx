import { Stack } from "expo-router";
import { createContext, useContext, useMemo, useState } from "react";

const lightColors = {
  background: "#fff",
  card: "#f2f7f9",
  text: "#111",
  subtext: "#555",
  accent: "#1e88a8",
  border: "#eee",
  danger: "#a83232",
};
const darkColors = {
  background: "#121417",
  card: "#1e2126",
  text: "#f2f2f2",
  subtext: "#a0a4ab",
  accent: "#4fb3d1",
  border: "#2a2d33",
  danger: "#e57373",
};

const ThemeContext = createContext<{
  isDark: boolean;
  colors: typeof lightColors;
  toggleDark: (v: boolean) => void;
} | null>(null);

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used within RootLayout");
  return value;
}

export default function RootLayout() {
  const [isDark, setIsDark] = useState(false);
  const value = useMemo(
    () => ({
      isDark,
      colors: isDark ? darkColors : lightColors,
      toggleDark: setIsDark,
    }),
    [isDark],
  );

  return (
    <ThemeContext.Provider value={value}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: value.colors.card },
          headerTintColor: value.colors.text,
          contentStyle: { backgroundColor: value.colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="course/[id]"
          options={{ title: "Course Details" }}
        />
        <Stack.Screen
          name="student/[id]"
          options={{ title: "Student Details" }}
        />
        <Stack.Screen name="lab08" options={{ title: "Attendance List" }} />
      </Stack>
    </ThemeContext.Provider>
  );
}
