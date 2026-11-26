import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseNav from '../components/ExerciseNav';
import Exercise8_PropertyRental from '../exercises/Exercise8_PropertyRental';

export default function Exercise8Screen() {
  return (
    <View style={styles.container}>
      <ExerciseNav current={8} />
      <Exercise8_PropertyRental />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
