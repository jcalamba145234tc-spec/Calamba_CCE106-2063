import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StatCard from '../../components/StatCard';
import { useUser } from '../../context/UserContext';

export default function HomeScreen() {
  const { fullName, events } = useUser();
  const totalEvents = events.length;
  const joinedEvents = events.filter((e) => e.joined).length;
  const upcomingEvents = totalEvents;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.welcomeBox}>
        <Text style={styles.appTitle}>EventMate</Text>
        <Text style={styles.name}>Welcome back, {fullName}!</Text>
        <Text style={styles.subtitle}>Explore campus activities and manage your schedule offline.</Text>
      </View>

      <Text style={styles.sectionHeading}>Overview Metrics</Text>
      <View style={styles.statsContainer}>
        <StatCard label="Total Events" value={totalEvents} color="#2563eb" />
        <StatCard label="Joined Events" value={joinedEvents} color="#16a34a" />
        <StatCard label="Upcoming" value={upcomingEvents} color="#d97706" />
      </View>

      <Link href="/(tabs)/events" style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Browse All Events →</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f8fafc', flexGrow: 1 },
  welcomeBox: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 2 },
  appTitle: { fontSize: 28, fontWeight: 'bold', color: '#2563eb' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginVertical: 4 },
  subtitle: { fontSize: 13, color: '#94a3b8', marginTop: 4 },
  sectionHeading: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 10 },
  statsContainer: { flexDirection: 'column', justifyContent: 'space-between', marginBottom: 20 },
  actionButton: { backgroundColor: '#2563eb', padding: 16, borderRadius: 12, alignItems: 'center', textAlign: 'center', elevation: 4 },
  actionButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});
