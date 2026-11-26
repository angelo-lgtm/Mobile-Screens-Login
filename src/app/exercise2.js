import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseNav from '../components/ExerciseNav';
import Exercise2_StudentAdmission from '../exercises/Exercise2_StudentAdmission';

export default function Exercise2Screen() {
  return (
    <View style={styles.container}>
      <ExerciseNav current={2} />
      <Exercise2_StudentAdmission />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
