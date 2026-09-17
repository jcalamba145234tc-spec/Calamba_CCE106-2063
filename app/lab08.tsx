import { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const initialStudents = ['Jake','Badong', 'Jovic', 'Edmund', 'Kylie'];

export default function Lab08() {
  const [students, setStudents] = useState(initialStudents);
  const [attendance, setAttendance] = useState<{ [key: string]: string }>({
    Jake: '',
    Badong: '',
    Jovic: '',
    Edmund: '',
    Kylie: '',
  });
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [newStudentName, setNewStudentName] = useState('');
  const [editingStudent, setEditingStudent] = useState('');
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    const present = Object.values(attendance).filter(
      (status) => status === 'Present'
    ).length;
    const absent = Object.values(attendance).filter(
      (status) => status === 'Absent'
    ).length;

    setPresentCount(present);
    setAbsentCount(absent);
  }, [attendance]);

  function updateAttendance(studentName: string, status: string) {
    setAttendance({ ...attendance, [studentName]: status });
  }

  function resetAttendance() {
    const clearedAttendance: { [key: string]: string } = {};

    students.forEach((student) => {
      clearedAttendance[student] = '';
    });

    setAttendance(clearedAttendance);
  }

  function addStudent() {
    const name = newStudentName.trim();

    if (name && !students.includes(name)) {
      setStudents([...students, name]);
      setAttendance({ ...attendance, [name]: '' });
      setNewStudentName('');
    }
  }

  function startEditing(studentName: string) {
    setEditingStudent(studentName);
    setEditedName(studentName);
  }

  function saveStudentName(oldName: string) {
    const newName = editedName.trim();

    if (!newName || (newName !== oldName && students.includes(newName))) {
      return;
    }

    if (newName === oldName) {
      setEditingStudent('');
      return;
    }

    const updatedAttendance = { ...attendance };
    updatedAttendance[newName] = updatedAttendance[oldName];
    delete updatedAttendance[oldName];

    setStudents(students.map((student) => (student === oldName ? newName : student)));
    setAttendance(updatedAttendance);
    setEditingStudent('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Attendance List</Text>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{presentCount}</Text>
            <Text style={styles.presentLabel}>Present</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{absentCount}</Text>
            <Text style={styles.absentLabel}>Absent</Text>
          </View>
        </View>

        <Pressable onPress={resetAttendance} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Attendance</Text>
        </Pressable>

        <View style={styles.addStudentCard}>
          <Text style={styles.addStudentTitle}>Add Student</Text>
          <View style={styles.addStudentRow}>
            <TextInput
              value={newStudentName}
              onChangeText={setNewStudentName}
              placeholder="Enter student name"
              style={styles.nameInput}
            />
            <Pressable onPress={addStudent} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Students</Text>

        {students.map((student) => (
          <View key={student} style={styles.studentCard}>
            <View style={styles.nameRow}>
              {editingStudent === student ? (
                <TextInput
                  value={editedName}
                  onChangeText={setEditedName}
                  style={styles.editNameInput}
                />
              ) : (
                <Text style={styles.studentName}>{student}</Text>
              )}

              <Pressable
                onPress={() =>
                  editingStudent === student
                    ? saveStudentName(student)
                    : startEditing(student)
                }
                style={styles.editButton}>
                <Text style={styles.editButtonText}>
                  {editingStudent === student ? 'Save' : 'Edit'}
                </Text>
              </Pressable>
            </View>

            <View style={styles.buttonRow}>
              <Pressable
                onPress={() => updateAttendance(student, 'Present')}
                style={[
                  styles.button,
                  styles.presentButton,
                  attendance[student] === 'Present' && styles.presentSelected,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    attendance[student] === 'Present' && styles.selectedButtonText,
                  ]}>
                  Present
                </Text>
              </Pressable>

              <Pressable
                onPress={() => updateAttendance(student, 'Absent')}
                style={[
                  styles.button,
                  styles.absentButton,
                  attendance[student] === 'Absent' && styles.absentSelected,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    attendance[student] === 'Absent' && styles.selectedButtonText,
                  ]}>
                  Absent
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 18,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  presentLabel: {
    marginTop: 4,
    color: '#15803D',
    fontWeight: '600',
  },
  absentLabel: {
    marginTop: 4,
    color: '#B91C1C',
    fontWeight: '600',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  addStudentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },
  resetButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    marginBottom: 16,
    paddingVertical: 12,
  },
  resetButtonText: {
    color: '#B91C1C',
    fontSize: 15,
    fontWeight: '600',
  },
  addStudentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  addStudentRow: {
    flexDirection: 'row',
  },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 9,
    color: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  addButton: {
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 9,
    marginLeft: 8,
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  studentName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  editNameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#94A3B8',
    borderRadius: 8,
    color: '#1F2937',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  editButton: {
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  editButtonText: {
    color: '#0369A1',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 9,
    paddingVertical: 11,
  },
  presentButton: {
    borderColor: '#86EFAC',
    backgroundColor: '#F0FDF4',
    marginRight: 8,
  },
  absentButton: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  presentSelected: {
    borderColor: '#16A34A',
    backgroundColor: '#16A34A',
  },
  absentSelected: {
    borderColor: '#DC2626',
    backgroundColor: '#DC2626',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
});
