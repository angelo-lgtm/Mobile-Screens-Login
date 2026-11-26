import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="exercise1" options={{ title: 'Exercise #1 - Registration' }} />
      <Stack.Screen name="exercise2" options={{ title: 'Exercise #2 - Admission' }} />
      <Stack.Screen name="exercise3" options={{ title: 'Exercise #3 - Transfer' }} />
      <Stack.Screen name="exercise4" options={{ title: 'Exercise #4 - Appointment' }} />
      <Stack.Screen name="exercise5" options={{ title: 'Exercise #5 - Job Application' }} />
      <Stack.Screen name="exercise6" options={{ title: 'Exercise #6 - Checkout' }} />
      <Stack.Screen name="exercise7" options={{ title: 'Exercise #7 - Event Sign-up' }} />
      <Stack.Screen name="exercise8" options={{ title: 'Exercise #8 - Rental Form' }} />
    </Stack>
  );
}
