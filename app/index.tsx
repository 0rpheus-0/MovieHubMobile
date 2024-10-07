import Logo from '@/components/Logo';
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo />
      <Text style={{ color: 'white' }}>Welcom!</Text>
    </View>
  );
}
