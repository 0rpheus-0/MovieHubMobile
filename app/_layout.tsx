
import { Stack } from 'expo-router';
import React from 'react';



export default function Layout() {
  return (
    <Stack screenOptions={{
      statusBarHidden: true,
      // statusBarColor: 'orange',
      // statusBarStyle: 'dark',
      animation: undefined,
      headerShown: false
    }} />
  );
}
