import Logo from '@/components/Logo';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { StatusBar, Text, View } from "react-native";

const PhysicalScreen = (props: View['props']) => <View
  {...props}
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...props.style as {},
  }}
/>

const Screen = (props: View['props']) => <View
  {...props}
  style={{
    flexGrow: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    width: '100%',
    ...props.style as {},
  }}
/>

const Header = (props: View['props']) => <View
  {...props}
  style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...props.style as {},
  }}
/>

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
      <Screen style={{ backgroundColor: 'black' }}>
        <Header>
          <Logo />
          <Fontisto name='user-secret' color='orange' size={40} />
        </Header>
        <Ionicons name='accessibility' color='orange' />
        <Text style={{ color: 'white' }}>Welcom!</Text>
      </Screen>
    </PhysicalScreen>
  );
}
