import { StyleSheet, View } from "react-native";
import { QuotesPanel } from "../../components/quotes-panel";
import { useTheme } from "../_layout";

export default function QuotesScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <QuotesPanel />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", paddingHorizontal: 22, paddingVertical: 28 },
});
