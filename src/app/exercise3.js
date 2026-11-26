import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseNav from '../components/ExerciseNav';
import Exercise3_BankingTransfer from '../exercises/Exercise3_BankingTransfer';

export default function Exercise3Screen() {
  return (
    <View style={styles.container}>
      <ExerciseNav current={3} />
      <Exercise3_BankingTransfer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
