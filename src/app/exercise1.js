import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseNav from '../components/ExerciseNav';
import Exercise1_Registration from '../exercises/Exercise1_Registration';

export default function Exercise1Screen() {
  return (
    <View style={styles.container}>
      <ExerciseNav current={1} />
      <Exercise1_Registration />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
