import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseNav from '../components/ExerciseNav';
import Exercise5_JobApplication from '../exercises/Exercise5_JobApplication';

export default function Exercise5Screen() {
  return (
    <View style={styles.container}>
      <ExerciseNav current={5} />
      <Exercise5_JobApplication />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
