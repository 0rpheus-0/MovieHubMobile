
import { PhysicalScreen } from '@/components/constants';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from "react-native";


export default function Layout() {
  useEffect(() => {
    StatusBar.setTranslucent(false)
    StatusBar.setBackgroundColor('orange')
    StatusBar.setBarStyle('dark-content')
  }, [])

  return (
    <PhysicalScreen>
      <StatusBar />
      <Stack initialRouteName='auntification' screenOptions={{ animation: undefined, headerShown: false }}>
        <Stack.Screen name="auntification" />
        <Stack.Screen name="registration" />
        <Stack.Screen name="index" />
      </Stack>
    </PhysicalScreen >
  );
}
