import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import EventCard from '../../components/EventCard';
import { useUser } from '../../context/UserContext';

type FilterCategory = 'All' | 'Technology' | 'Social' | 'Academic' | 'Sports';

export default function EventsScreen() {
  const { events } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');

  const filteredEvents =
    selectedCategory === 'All'
      ? events
      : events.filter((e) => e.category === selectedCategory);

  const categories: FilterCategory[] = ['All', 'Technology', 'Sports', 'Academic', 'Social'];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Campus Events</Text>
      <View style={styles.filterRow}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.filterChip, selectedCategory === cat && styles.activeChip]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.chipText, selectedCategory === cat && styles.activeChipText]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No events found for this category.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#e2e8f0', borderRadius: 20, marginRight: 8, marginBottom: 8 },
  activeChip: { backgroundColor: '#2563eb' },
  chipText: { fontSize: 13, color: '#475569', fontWeight: '500' },
  activeChipText: { color: '#ffffff' },
  listContainer: { paddingBottom: 20 },
  emptyText: { textAlign: 'center', color: '#94a3b8', marginTop: 40, fontSize: 14 },
});
