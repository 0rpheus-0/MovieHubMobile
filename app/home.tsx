
import { Header, MyButton, MyText, MyTextInput, Screen } from '@/components/constants';
import Logo from '@/components/Logo';
import useNativeText from '@/hooks/useNativeText';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from '@react-navigation/native';
import { View } from "react-native";

export default function Home() {
    const nativeText = useNativeText()
    return (
        <Screen>
            <Header>
                <Link to={'/'}>
                    <Logo />
                </Link>
                <Link to={'/'}>
                    <Fontisto name='user-secret' color='orange' size={40} />
                </Link>
            </Header>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                position: 'absolute',
                top: 60,
                left: 10,
            }}>
                <MyTextInput placeholder={nativeText.movieName} />
                <MyButton><MyText>fjrkmvnj</MyText></MyButton>
            </View>
            <Ionicons name='accessibility' color='orange' />
            <MyText>{nativeText.welcom}</MyText>
        </Screen>
    )
}