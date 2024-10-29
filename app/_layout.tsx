
import { Stack } from 'expo-router';
import React from 'react';


export default function Layout() {
  return (
    <Stack screenOptions={{
      statusBarColor: 'orange',
      statusBarStyle: 'dark',
      animation: undefined,
      headerShown: false
    }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="login/registration" />
      {/* <Stack.Screen name="app/index.tsx" /> */}
    </Stack>

  );
}
