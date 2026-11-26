import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';

// Import all 8 Exercises
import Exercise1_Registration from './src/exercises/Exercise1_Registration';
import Exercise2_StudentAdmission from './src/exercises/Exercise2_StudentAdmission';
import Exercise3_BankingTransfer from './src/exercises/Exercise3_BankingTransfer';
import Exercise4_HospitalAppointment from './src/exercises/Exercise4_HospitalAppointment';
import Exercise5_JobApplication from './src/exercises/Exercise5_JobApplication';
import Exercise6_EcommerceCheckout from './src/exercises/Exercise6_EcommerceCheckout';
import Exercise7_EventRegistration from './src/exercises/Exercise7_EventRegistration';
import Exercise8_PropertyRental from './src/exercises/Exercise8_PropertyRental';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');

  const exercises = [
    {
      id: 'ex1',
      title: 'Exercise #1: User Registration Form',
      desc: 'Inputs, Switch for terms, validation rules & error messages.',
      color: '#3182CE',
      screen: Exercise1_Registration,
    },
    {
      id: 'ex2',
      title: 'Exercise #2: Student Admission Form',
      desc: 'Controls for gender & program, score >= 50 challenge.',
      color: '#2563EB',
      screen: Exercise2_StudentAdmission,
    },
    {
      id: 'ex3',
      title: 'Exercise #3: Online Banking Transfer',
      desc: 'Account & PIN validation, transfer confirmation screen.',
      color: '#059669',
      screen: Exercise3_BankingTransfer,
    },
    {
      id: 'ex4',
      title: 'Exercise #4: Hospital Appointment',
      desc: 'Doctor/Dept selection, date cannot be in the past.',
      color: '#0284C7',
      screen: Exercise4_HospitalAppointment,
    },
    {
      id: 'ex5',
      title: 'Exercise #5: Job Application Form',
      desc: 'Position, education, cover letter length & CV attachment.',
      color: '#7C3AED',
      screen: Exercise5_JobApplication,
    },
    {
      id: 'ex6',
      title: 'Exercise #6: E-Commerce Checkout',
      desc: 'Product quantity > 0 challenge, payment & delivery options.',
      color: '#EA580C',
      screen: Exercise6_EcommerceCheckout,
    },
    {
      id: 'ex7',
      title: 'Exercise #7: Event Registration',
      desc: 'Attendance type, 1-3 days restriction & summary card.',
      color: '#4338CA',
      screen: Exercise7_EventRegistration,
    },
    {
      id: 'ex8',
      title: 'Exercise #8: Property Rental Application',
      desc: 'Rental info, income >= 3x rent business challenge.',
      color: '#0D9488',
      screen: Exercise8_PropertyRental,
    },
  ];

  // If a specific exercise is chosen, render that exercise component
  const activeExercise = exercises.find((item) => item.id === currentScreen);
  if (activeExercise) {
    const ScreenComponent = activeExercise.screen;
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ScreenComponent onBack={() => setCurrentScreen('menu')} />
      </SafeAreaView>
    );
  }

  // Otherwise, render Main Exercises Menu
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <View style={styles.headerBox}>
          <Text style={styles.appTitle}>Mobile Form Exercises</Text>
          <Text style={styles.appSubtitle}>React Native Homework Submissions</Text>
          <Text style={styles.appInstruction}>
            Tap any exercise below to view, test validation, and submit the form.
          </Text>
        </View>

        <View style={styles.listContainer}>
          {exercises.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => setCurrentScreen(item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.badge, { backgroundColor: item.color }]}>
                <Text style={styles.badgeText}>#{index + 1}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  menuContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerBox: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 8,
  },
  appInstruction: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  listContainer: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#64748B',
  },
  chevron: {
    fontSize: 24,
    color: '#94A3B8',
    marginLeft: 8,
  },
});
