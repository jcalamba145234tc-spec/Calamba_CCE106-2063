import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EventItem } from '../../data/events';

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/event/${event.id}`} asChild>
      <Pressable style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.categoryBadge}>{event.category}</Text>
          {event.joined && <Text style={styles.joinedBadge}>Joined ✓</Text>}
        </View>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.detailText}>📅 {event.date}</Text>
        <Text style={styles.detailText}>📍 {event.venue}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  categoryBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  joinedBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 6 },
  detailText: { fontSize: 13, color: '#64748b', marginTop: 2 },
});
