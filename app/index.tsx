
import Auntification from '@/app/auntification';
import Home from '@/app/home';
import Registration from '@/app/registration';
import { PhysicalScreen } from '@/components/constants';
import { createStackNavigator } from '@react-navigation/stack';
import SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { StatusBar } from "react-native";

const Stack = createStackNavigator();
const db = SQLite.openDatabaseAsync('mydatabase.db');

export default function Index() {
  // const db = SQLite.useSQLiteContext()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    StatusBar.setTranslucent(false)
    StatusBar.setBackgroundColor('orange')
    StatusBar.setBarStyle('dark-content')
  }, [])

  return (
    <PhysicalScreen>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="Auntification" component={Auntification} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </PhysicalScreen >
  );
}
