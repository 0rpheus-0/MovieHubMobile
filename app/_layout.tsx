
import { PhysicalScreen } from '@/components/constants';
import { useDatabase } from '@/storages/useDatabase';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from "react-native";


export default function Layout() {
  const { db } = useDatabase()

  useEffect(() => {
    StatusBar.setTranslucent(false)
    StatusBar.setBackgroundColor('orange')
    StatusBar.setBarStyle('dark-content')
  }, [])

  return (
    <PhysicalScreen>
      <StatusBar />
      <Stack initialRouteName="home" screenOptions={{ animation: undefined, headerShown: false }}>
        <Stack.Screen name="auntification" />
        <Stack.Screen name="registration" />
        <Stack.Screen name="index" />
      </Stack>
    </PhysicalScreen >
  );
}
