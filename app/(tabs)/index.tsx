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
        <ThemedView style={styles.badge}>
          <ThemedText style={styles.badgeText}>v1.0</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.styledCard}>
        <ThemedText type="subtitle" style={styles.cardSubtitle}>
          App Information
        </ThemedText>
        <ThemedText style={styles.textRow}>
          <ThemedText type="defaultSemiBold">Student Name:</ThemedText> Jake T.
          Calamba
        </ThemedText>
        <ThemedText style={styles.textRow}>
          <ThemedText type="defaultSemiBold">Course & Section:</ThemedText> BSIT
          - 3rd Year
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.styledCard, styles.accentCard]}>
        <ThemedText type="subtitle" style={styles.cardSubtitle}>
          Short App Idea
        </ThemedText>
        <ThemedText style={styles.bodyText}>
          StudySpace is a mobile hub designed for college students to organize
          focus sessions, share notes, and manage collaborative group projects
          seamlessly.
        </ThemedText>

        <ThemedView style={styles.fakeButton}>
          <ThemedText style={styles.buttonText}>Learn More →</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  styledCard: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  accentCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  cardSubtitle: {
    marginBottom: 4,
    fontSize: 18,
  },
  textRow: {
    lineHeight: 22,
  },
  bodyText: {
    lineHeight: 22,
    opacity: 0.9,
    marginBottom: 12,
  },
  fakeButton: {
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  buttonText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
