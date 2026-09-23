import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../app/_layout";
import { fetchRandomQuote, type Quote } from "../services/quotes-api";

export function QuotesPanel() {
  const { colors, isDark } = useTheme();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuote = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const nextQuote = await fetchRandomQuote(signal);
      if (!signal?.aborted) setQuote(nextQuote);
    } catch (requestError) {
      if (signal?.aborted) return;
      setError(requestError instanceof Error ? requestError.message : "Unable to load a quote.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadQuote(controller.signal);
    return () => controller.abort();
  }, [loadQuote]);

  const card = isDark ? "#202b38" : "#ffffff";
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeading}>
        <View style={[styles.accentDot, { backgroundColor: colors.accent }]} />
        <Text style={[styles.sectionLabel, { color: colors.subtext }]}>QUOTE OF THE DAY</Text>
      </View>
      <View style={[styles.quoteCard, { backgroundColor: card, borderColor: colors.border }]}>
        <Text style={[styles.quoteMark, { color: colors.accent }]} accessibilityElementsHidden>
          {"\u201c"}
        </Text>
        {loading && !quote ? (
          <View style={styles.stateContent} accessibilityLiveRegion="polite">
            <ActivityIndicator size="large" color={colors.accent} />
            <Text style={[styles.stateText, { color: colors.subtext }]}>Loading quote...</Text>
          </View>
        ) : error && !quote ? (
          <View style={styles.stateContent} accessibilityLiveRegion="polite">
            <Ionicons name="cloud-offline-outline" size={28} color={colors.subtext} />
            <Text style={[styles.stateText, { color: colors.text }]}>{error}</Text>
            <Text style={[styles.emptyText, { color: colors.subtext }]}>Press New Quote to try again.</Text>
          </View>
        ) : quote ? (
          <View accessibilityLiveRegion="polite">
            <Text style={[styles.quoteText, { color: colors.text }]}>{quote.quote}</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.author, { color: colors.subtext }]}>{quote.author}</Text>
            {error ? <Text style={[styles.inlineError, { color: colors.danger }]}>{error}</Text> : null}
          </View>
        ) : (
          <Text style={[styles.emptyText, { color: colors.subtext }]}>No quote available.</Text>
        )}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Get a new quote"
        accessibilityState={{ disabled: loading }}
        disabled={loading}
        onPress={() => void loadQuote()}
        style={({ pressed }) => [styles.button, { backgroundColor: colors.accent, opacity: loading ? 0.65 : pressed ? 0.82 : 1 }]}
      >
        {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <Ionicons name="refresh" size={18} color="#ffffff" />}
        <Text style={styles.buttonText}>{loading ? "Loading quote" : "New Quote"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", maxWidth: 520, alignSelf: "center", marginTop: 24 },
  sectionHeading: { flexDirection: "row", alignItems: "center", gap: 9, marginBottom: 11 },
  accentDot: { width: 7, height: 7, borderRadius: 4 },
  sectionLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 1.5 },
  quoteCard: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 21, paddingTop: 15, paddingBottom: 22, minHeight: 170, justifyContent: "center", shadowColor: "#102030", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 2 },
  quoteMark: { fontSize: 48, lineHeight: 51, height: 42, fontWeight: "700" },
  quoteText: { fontSize: 19, lineHeight: 29, fontWeight: "500", letterSpacing: 0.1 },
  divider: { height: 1, marginTop: 19, marginBottom: 12 },
  author: { fontSize: 13, lineHeight: 19, fontWeight: "600", letterSpacing: 0.3 },
  stateContent: { alignItems: "center", justifyContent: "center", gap: 12, paddingVertical: 16 },
  stateText: { fontSize: 14, lineHeight: 21, textAlign: "center" },
  emptyText: { fontSize: 12, lineHeight: 18, textAlign: "center" },
  inlineError: { fontSize: 12, lineHeight: 18, marginTop: 12 },
  button: { minHeight: 48, borderRadius: 13, marginTop: 13, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9 },
  buttonText: { color: "#ffffff", fontSize: 14, fontWeight: "700", letterSpacing: 0.2 },
});
