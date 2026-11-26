import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseNav from '../components/ExerciseNav';
import Exercise6_EcommerceCheckout from '../exercises/Exercise6_EcommerceCheckout';

export default function Exercise6Screen() {
  return (
    <View style={styles.container}>
      <ExerciseNav current={6} />
      <Exercise6_EcommerceCheckout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
