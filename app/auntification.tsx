
import { Centred, MyButton, MyText, MyTextInput, Screen } from '@/components/constants';
import Logo from '@/components/Logo';
import useNativeText from '@/hooks/useNativeText';
import Ionicons from '@expo/vector-icons/Ionicons';
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

    return (
        <Screen>
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
                    <MyButton onPress={() => nativeText.setLanguage(nativeText.language === 'ru' ? 'en' : 'ru')}>
                        <MyText>{nativeText.logIn}</MyText>
                    </MyButton>
                    <MyText onPress={() => alert("Chamber!")}>{nativeText.createAccount}</MyText>
                </Centred>
            </Centred>
        </Screen >
    );
}