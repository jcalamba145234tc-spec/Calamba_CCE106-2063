import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { EventItem } from '../data/events';

export default function EventCard({ event }: { event: EventItem }) {
  const router = useRouter();
  return <Pressable accessibilityLabel={`View details for ${event.title}`} onPress={() => router.push({ pathname: '/event/[id]', params: { id: event.id } })} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
    <View style={styles.topRow}><Text style={styles.category}>{event.category}</Text><Text style={[styles.status, event.joined ? styles.joined : styles.available]}>{event.joined ? 'Joined' : event.available ? 'Available' : 'Full'}</Text></View>
    <Text style={styles.title}>{event.title}</Text><Text style={styles.detail}>{event.date} at {event.time}</Text><Text style={styles.detail}>{event.venue}</Text><Text style={styles.link}>View Details</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: 14, borderWidth: 1, marginBottom: 12, padding: 16 }, pressed: { opacity: 0.75 }, topRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  category: { color: '#1d4ed8', backgroundColor: '#dbeafe', borderRadius: 99, fontSize: 12, fontWeight: '700', overflow: 'hidden', paddingHorizontal: 9, paddingVertical: 4 }, status: { fontSize: 12, fontWeight: '700' }, joined: { color: '#15803d' }, available: { color: '#64748b' },
  title: { color: '#0f172a', fontSize: 18, fontWeight: '700', marginTop: 12 }, detail: { color: '#64748b', fontSize: 14, marginTop: 5 }, link: { color: '#2563eb', fontSize: 14, fontWeight: '700', marginTop: 14 },
});
