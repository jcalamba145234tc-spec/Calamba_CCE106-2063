import { Stack } from "expo-router";
import React, { createContext, useContext, useState } from "react";

const lightColors = {
  background: "#fff",
  text: "#111",
  subtext: "#555",
  border: "#eee",
  accent: "#1e88a8",
  danger: "#a83232",
  tabInactive: "#888",
};

const darkColors = {
  background: "#121417",
  text: "#f2f2f2",
  subtext: "#a0a4ab",
  border: "#2a2d33",
  accent: "#4fb3d1",
  danger: "#e57373",
  tabInactive: "#666",
};

const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: (value: boolean) => {},
  colors: lightColors,
});

export const useTheme = () => useContext(ThemeContext);

export default function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const colors = darkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, colors }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
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
      </Stack>
    </ThemeContext.Provider>
  );
}
