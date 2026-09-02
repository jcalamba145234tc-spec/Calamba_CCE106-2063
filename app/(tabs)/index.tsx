import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export default function App() {
  const studentInfo = {
    name: 'Jake T. Calamba',
    program: 'BS Information Technology',
    email: 'j.calamba.145234.tc@umindanao.edu.ph',
  };

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review Basic React Native Components', dueDate: '2026-09-05', completed: false },
    { id: '2', title: 'Finish Math Assignment', dueDate: '2026-09-08', completed: true },
    { id: '3', title: 'Study for Exams', dueDate: '2026-09-10', completed: false },
  ]);

  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const onDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setDueDate(formatDate(date));
    }
  };

  const handleAddTask = () => {
    if (!taskTitle.trim() || !dueDate.trim()) {
      Alert.alert('Required Fields', 'Please enter a task title and select a due date.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTaskTitle('');
    setDueDate('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const pending = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <View style={styles.header}>
                <View>
                  <Text style={styles.headerTitle}>Task Dashboard</Text>
                  <Text style={styles.headerSub}>Track your daily progress</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{tasks.length} Total</Text>
                </View>
              </View>

              <View style={styles.userCard}>
                <Image
                  source={require('../../assets/images/profile.png')}
                  style={styles.avatar}
                  resizeMode="cover"
                />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{studentInfo.name}</Text>
                  <Text style={styles.userDetails}>{studentInfo.program}</Text>
                  <Text style={styles.userSubDetails}>{studentInfo.email}</Text>
                </View>
              </View>

              <View style={styles.metricsRow}>
                <View style={styles.metricCard}>
                  <View style={[styles.metricIconBg, { backgroundColor: '#3B82F620' }]}>
                    <MaterialCommunityIcons name="progress-clock" size={20} color="#60A5FA" />
                  </View>
                  <View style={styles.metricTextGroup}>
                    <Text style={styles.metricValue}>{pending}</Text>
                    <Text style={styles.metricLabel}>In Progress</Text>
                  </View>
                </View>

                <View style={styles.metricCard}>
                  <View style={[styles.metricIconBg, { backgroundColor: '#10B98120' }]}>
                    <MaterialCommunityIcons name="check-all" size={20} color="#34D399" />
                  </View>
                  <View style={styles.metricTextGroup}>
                    <Text style={styles.metricValue}>{completed}</Text>
                    <Text style={styles.metricLabel}>Completed</Text>
                  </View>
                </View>
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Create Action Item</Text>
                
                <TextInput
                  style={styles.textInput}
                  placeholder="What needs to be done?"
                  placeholderTextColor="#64748B"
                  value={taskTitle}
                  onChangeText={setTaskTitle}
                />

                <View style={styles.formActionRow}>
                  <TouchableOpacity
                    style={styles.dateSelector}
                    activeOpacity={0.7}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <MaterialCommunityIcons name="calendar-range" size={18} color="#06B6D4" />
                    <Text style={[styles.dateText, !dueDate && styles.datePlaceholder]}>
                      {dueDate || 'Due Date'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.submitBtn}
                    activeOpacity={0.8}
                    onPress={handleAddTask}
                  >
                    <MaterialCommunityIcons name="plus" size={20} color="#0F1F2A" />
                    <Text style={styles.submitBtnText}>Add</Text>
                  </TouchableOpacity>
                </View>

                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                    minimumDate={new Date()}
                  />
                )}
              </View>

              <Text style={styles.sectionTitle}>Overview</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <TouchableOpacity
                onPress={() => toggleTask(item.id)}
                style={styles.checkboxTouch}
                activeOpacity={0.6}
              >
                <MaterialCommunityIcons
                  name={item.completed ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                  size={22}
                  color={item.completed ? '#34D399' : '#64748B'}
                />
              </TouchableOpacity>

              <View style={styles.taskContent}>
                <Text style={[styles.taskTitleText, item.completed && styles.strikeText]}>
                  {item.title}
                </Text>
                <View style={styles.dateBadge}>
                  <MaterialCommunityIcons name="clock-outline" size={12} color="#94A3B8" />
                  <Text style={styles.dateBadgeText}>{item.dueDate}</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => removeTask(item.id)}
                style={styles.deleteBtn}
                activeOpacity={0.6}
              >
                <MaterialCommunityIcons name="trash-can-outline" size={18} color="#F87171" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyStateText}>No tasks found in schedule.</Text>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  listContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  headerSub: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusBadgeText: {
    color: '#06B6D4',
    fontSize: 12,
    fontWeight: '600',
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#334155',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  userDetails: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  userSubDetails: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  metricIconBg: {
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  metricTextGroup: {
    justifyContent: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  metricLabel: {
    fontSize: 11,
    color: '#94A3B8',
  },
  formContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  formTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 10,
  },
  formActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateSelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 8,
  },
  dateText: {
    fontSize: 13,
    color: '#F8FAFC',
  },
  datePlaceholder: {
    color: '#64748B',
  },
  submitBtn: {
    backgroundColor: '#06B6D4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 4,
  },
  submitBtnText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 12,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  checkboxTouch: {
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitleText: {
    fontSize: 14,
    color: '#F8FAFC',
    fontWeight: '500',
  },
  strikeText: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  dateBadgeText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  deleteBtn: {
    padding: 4,
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 13,
    marginTop: 24,
  },
});