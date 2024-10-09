
import { PhysicalScreen } from '@/components/constants';
import { useEffect } from 'react';
import { StatusBar } from "react-native";
import Auntification from './auntification';

export default function Index() {
  // const db = useSQLiteContext()
  useEffect(() => {
    StatusBar.setTranslucent(false)
    StatusBar.setBackgroundColor('orange')
    StatusBar.setBarStyle('dark-content')
  }, [])

  return (
    <PhysicalScreen>
      <StatusBar />
      <Auntification />
    </PhysicalScreen >
  );
}
