import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseNav from '../components/ExerciseNav';
import Exercise4_HospitalAppointment from '../exercises/Exercise4_HospitalAppointment';

export default function Exercise4Screen() {
  return (
    <View style={styles.container}>
      <ExerciseNav current={4} />
      <Exercise4_HospitalAppointment />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
