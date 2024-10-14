
import { Centred, Header, MyButton, MyText, MyTextInput, Screen } from '@/components/constants';
import Logo from '@/components/Logo';
import useNativeText from '@/hooks/useNativeText';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { useState } from 'react';
import Animated, { Easing, useAnimatedStyle, withRepeat, withSequence, withTiming } from "react-native-reanimated";

export default function Registration() {
    const nativeText = useNativeText()
    const jumpingManStyle = useAnimatedStyle(() => ({
        transform: [{
            translateY: withRepeat(
                withSequence(
                    withTiming(-10, { duration: 150, easing: Easing.out(Easing.cubic) }),
                    withTiming(0, { duration: 150, easing: Easing.in(Easing.cubic) })
                ), -1, true)
        }]
    }))

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

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
                    <MyTextInput placeholder={nativeText.username} />
                    <MyTextInput placeholder={nativeText.password} />
                    <MyTextInput placeholder={nativeText.repeatPassword} />
                    <MyButton onPress={() => nativeText.setLanguage(nativeText.language === 'ru' ? 'en' : 'ru')}>
                        <MyText>{nativeText.createAccount}</MyText>
                    </MyButton>
                    <Link href='/auntification' asChild>
                        <MyText style={{ color: 'orange' }}>{nativeText.logIn}</MyText>
                    </Link>
                </Centred>
            </Centred>
        </Screen >
    );
}