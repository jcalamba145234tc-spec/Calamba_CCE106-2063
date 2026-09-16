import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
}

export default function StatCard({ label, value, color = '#2563eb' }: StatCardProps) {
  const { width } = useWindowDimensions();
  const isWide = width > 768;

  return (
    <View style={[styles.card, { width: isWide ? '30%' : '100%', borderLeftColor: color }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 5,
  },
  value: { fontSize: 26, fontWeight: 'bold', color: '#1e293b' },
  label: { fontSize: 14, color: '#64748b', marginTop: 4 },
});