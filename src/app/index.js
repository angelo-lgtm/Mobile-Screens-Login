import React from 'react';
import { Redirect } from 'expo-router';

// Redirect root to exercise1 so no dashboard is shown
export default function Index() {
  return <Redirect href="/exercise1" />;
}
