import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useUser } from '../../context/UserContext';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { events, toggleJoinEvent } = useUser();

  const eventId = Array.isArray(id) ? id[0] : id;
  const eventData = events.find((e) => e.id === eventId);
  const [isJoined, setIsJoined] = useState(eventData ? eventData.joined : false);

  if (!eventData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Event Not Found</Text>
        <Text style={styles.errorSubtitle}>The event ID {id} does not exist or has been removed.</Text>
        <Pressable style={styles.recoveryButton} onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)/events')}>
          <Text style={styles.recoveryButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.categoryBadge}>{eventData.category}</Text>
        <Text style={styles.title}>{eventData.title}</Text>
        <Text style={styles.meta}>Time: {eventData.time}</Text>
        <Text style={styles.meta}>Status: {isJoined ? "You're joined!" : eventData.available ? 'Spaces available' : 'This event is currently full'}</Text>
        <Text style={styles.meta}>📅 {eventData.date}</Text>
        <Text style={styles.meta}>📍 {eventData.venue}</Text>
        <View style={styles.divider} />
        <Text style={styles.descriptionHeader}>About this Event</Text>
        <Text style={styles.description}>{eventData.description}</Text>

        <Pressable
          style={[styles.joinButton, isJoined ? styles.leaveButton : styles.joinButtonBg]}
          disabled={!eventData.available && !isJoined}
          onPress={() => {
            setIsJoined(!isJoined);
            toggleJoinEvent(eventData.id);
          }}
        >
          <Text style={styles.joinButtonText}>
            {isJoined ? 'Leave Event' : eventData.available ? 'Join Event' : 'Event Full'}
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back to Previous Screen</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  meta: {
    fontSize: 14,
    color: '#64748b',
    marginVertical: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  descriptionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 20,
  },
  joinButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonBg: {
    backgroundColor: '#2563eb',
  },
  leaveButton: {
    backgroundColor: '#dc2626',
  },
  joinButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 12,
  },
  backButtonText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  recoveryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  recoveryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
