
import { Column, Header, MyButton, MyText, MyTextInput, Row, Screen } from '@/components/constants';
import Logo from '@/components/Logo';
import useNativeText from '@/hooks/useNativeText';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Home({ navigation }) {
    const nativeText = useNativeText()
    return (
        <Screen>
            <Header>
                <Column style={{ padding: 10, width: '100%' }}>
                    <Row style={{ width: '100%' }}>
                        <Logo />
                        <Row>
                            <MaterialIcons
                                name="language"
                                color='orange'
                                size={40}
                                onPress={() => nativeText.setLanguage(nativeText.language === 'ru' ? 'en' : 'ru')} />
                            <Fontisto
                                name='user-secret'
                                color='orange'
                                size={40}
                                onPress={() => navigation.navigate('Auntification')} />
                        </Row>
                    </Row>
                    <Row style={{ width: '100%', justifyContent: 'flex-start' }} >
                        <MyTextInput style={{ flexGrow: 1 }} placeholder={nativeText.movieName} />
                        <MyButton style={{ width: 50 }}><MyText style={{ color: 'black' }}>+</MyText></MyButton>
                    </Row>
                </Column>
            </Header>
            <Ionicons name='accessibility' color='orange' />
            <MyText>{nativeText.welcom}</MyText>
        </Screen >
    )
}