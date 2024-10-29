
import { Column, Header, MyButton, MyText, MyTextInput, Row, Screen } from '@/components/constants';
import Logo from '@/components/Logo';
import useNativeText from '@/hooks/useNativeText';
import { useDatabase } from '@/storages/useDatabase';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { deleteDatabaseAsync } from 'expo-sqlite';

export default function AppIndex() {
    const nativeText = useNativeText()
    const database = useDatabase()
    const { db, close } = database;
    (window as any).db = database
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
                            <Link href="/login" asChild>
                                <Fontisto
                                    name='user-secret'
                                    color='orange'
                                    size={40}
                                />
                            </Link>
                        </Row>
                    </Row>
                    <Row style={{ width: '100%', justifyContent: 'flex-start' }} >
                        <MyTextInput style={{ flexGrow: 1 }} placeholder={nativeText.movieName} />
                        <MyButton style={{ width: 50 }}><MyText style={{ color: 'black' }}>+</MyText></MyButton>
                    </Row>
                </Column>
            </Header>
            <MyButton onPress={async () => console.log(await db?.getAllAsync('SELECT * FROM user'))}>
                <MyText>Show users</MyText>
            </MyButton>
            <MyButton onPress={async () => {
                await close()
                console.log(await deleteDatabaseAsync('movie-hub-mobile'))
            }}>
                <MyText>Drop database</MyText>
            </MyButton>
            <Ionicons name='accessibility' color='orange' />
            <MyText>{nativeText.welcom}</MyText>
        </Screen >
    )
}