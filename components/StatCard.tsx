import { StyleSheet, Text, View } from 'react-native';

type StatCardProps = { label: string; value: string | number; color?: string };

export default function StatCard({ label, value, color = '#2563eb' }: StatCardProps) {
  return <View style={[styles.card, { borderTopColor: color }]}><Text style={styles.value}>{value}</Text><Text style={styles.label}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  card: { flexGrow: 1, minWidth: 145, backgroundColor: '#fff', borderRadius: 14, borderTopWidth: 4, padding: 16, shadowColor: '#0f172a', shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  value: { color: '#0f172a', fontSize: 26, fontWeight: '700' }, label: { color: '#64748b', fontSize: 13, marginTop: 4 },
});
