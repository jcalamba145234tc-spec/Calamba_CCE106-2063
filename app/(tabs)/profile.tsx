import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useUser } from '../../context/UserContext';
export default function ProfileScreen() {
  const { fullName, email, updateProfile } = useUser();

  const [nameInput, setNameInput] = useState(fullName);
  const [emailInput, setEmailInput] = useState(email);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    setNameInput(fullName);
    setEmailInput(email);
  }, [fullName, email]);

  const handleSave = () => {
    setErrorMessage('');
    setSuccessMessage(false);

    if (!nameInput.trim() || !emailInput.trim()) {
      setErrorMessage('Both Full Name and Email fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setErrorMessage('Please enter a valid email structure containing an "@" character.');
      return;
    }

    updateProfile(nameInput, emailInput);
    setSuccessMessage(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {nameInput ? nameInput.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'JT'}
          </Text>
        </View>
        <Text style={styles.profileHeader}>Student Profile</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={nameInput}
          onChangeText={setNameInput}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={emailInput}
          onChangeText={setEmailInput}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successText}>✓ Profile updated globally!</Text> : null}

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f8fafc', flexGrow: 1 },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, alignItems: 'center', elevation: 2 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#eff6ff', justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 2, borderColor: '#2563eb' },
  avatarText: { fontSize: 28, fontWeight: 'bold', color: '#2563eb' },
  profileHeader: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 20 },
  label: { alignSelf: 'flex-start', fontSize: 13, fontWeight: '600', color: '#475569', marginBottom: 6 },
  input: { width: '100%', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, fontSize: 14, color: '#1e293b', marginBottom: 16 },
  errorText: { color: '#dc2626', fontSize: 13, marginBottom: 12, textAlign: 'center' },
  successText: { color: '#16a34a', fontSize: 13, marginBottom: 12, textAlign: 'center', fontWeight: '600' },
  saveButton: { width: '100%', backgroundColor: '#2563eb', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  saveButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
});
