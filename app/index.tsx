import Logo from '@/components/Logo';
import { StatusBar, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
      }}
    >
      <StatusBar backgroundColor='black' />
      <Logo />
      <Text style={{ color: 'white' }}>Welcom!</Text>
    </View>
  );
}
