
import { Centred, Header, MyButton, MyText, MyTextInput, Screen } from '@/components/constants';
import Logo from '@/components/Logo';
import useNativeText from '@/hooks/useNativeText';
import { useUsers } from '@/hooks/useUsers';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

export default function Auntification() {
    const nativeText = useNativeText()
    const manHeight = useSharedValue(0)
    const jumpingManStyle = useAnimatedStyle(() => ({
        transform: [{
            translateY: withRepeat(
                withSequence(
                    withTiming(-10, { duration: 150, easing: Easing.out(Easing.cubic) }),
                    withTiming(0, { duration: 150, easing: Easing.in(Easing.cubic) })
                ), -1, true)
        }]
    }))
    const { login } = useUsers();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            await login(username, password)
            router.replace('/');
        } catch (error) {
            alert('Auntification failed: ' + error)
        }
    };
    return (
        <Screen>
            <Header style={{ justifyContent: 'flex-end', padding: 10 }}>
                <MaterialIcons
                    name="language"
                    color='orange'
                    size={40}
                    onPress={() => nativeText.setLanguage(nativeText.language === 'ru' ? 'en' : 'ru')} />
            </Header>
            <Centred style={{ gap: 10 }}>
                <Centred>
                    <Animated.View style={jumpingManStyle}>
                        <Ionicons name='accessibility' color='orange' />
                    </Animated.View>
                    <MyText>{nativeText.welcom}</MyText>
                    <Logo />
                </Centred>
                <Centred style={{ gap: 20 }}>
                    <MyTextInput
                        placeholder={nativeText.username}
                        value={username}
                        onChangeText={setUsername} />
                    <MyTextInput
                        placeholder={nativeText.password}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry />
                    {/* <Link href='/' asChild> */}
                    <MyButton onPress={handleLogin}>
                        <MyText>{nativeText.logIn}</MyText>
                    </MyButton>
                    {/* </Link> */}
                    <Link href='./registration' asChild>
                        <MyText style={{ color: 'orange' }}>{nativeText.createAccount}</MyText>
                    </Link>
                </Centred>
            </Centred>
        </Screen >
    );
}