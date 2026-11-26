import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseNav from '../components/ExerciseNav';
import Exercise7_EventRegistration from '../exercises/Exercise7_EventRegistration';

export default function Exercise7Screen() {
  return (
    <View style={styles.container}>
      <ExerciseNav current={7} />
      <Exercise7_EventRegistration />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
