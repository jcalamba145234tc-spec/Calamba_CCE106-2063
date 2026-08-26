import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#1E2229", dark: "#0D0E11" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.mainTitle}>
          StudySpace
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.styledCard}>
        <ThemedText type="subtitle" style={styles.cardSubtitle}>
          App Information
        </ThemedText>
        <ThemedText style={styles.textSpacing}>
          <ThemedText type="defaultSemiBold">Student Name:</ThemedText> Jake T.
          Calamba
        </ThemedText>
        <ThemedText style={styles.textSpacing}>
          <ThemedText type="defaultSemiBold">Course & Section:</ThemedText> BSIT
          - 3rd Year
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.styledCard}>
        <ThemedText type="subtitle" style={styles.cardSubtitle}>
          Short App Idea
        </ThemedText>
        <ThemedText style={styles.bodyText}>
          StudySpace is a mobile hub designed for college students to organize
          focus sessions, share notes, and manage collaborative group projects
          seamlessly.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  mainTitle: {
    fontSize: 32,
    letterSpacing: 0.5,
  },
  styledCard: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  cardSubtitle: {
    marginBottom: 4,
  },
  textSpacing: {
    lineHeight: 22,
  },
  bodyText: {
    lineHeight: 22,
    opacity: 0.9,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
