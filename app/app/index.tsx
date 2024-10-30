
import { Column, Header, MyButton, MyText, MyTextInput, Row } from '@/components/constants';
import Logo from '@/components/Logo';
import Movie from '@/components/movie';
import useNativeText from '@/hooks/useNativeText';
import { useDatabase } from '@/storages/useDatabase';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import React from 'react';
import { View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

export default function AppIndex() {
    const nativeText = useNativeText()
    const database = useDatabase()
    const { db, close } = database;
    (window as any).db = database
    const movie = [
        {
            id: 1,
            name: 'Iron Man',
            year: '2002',
            genre: 'fantactic',
            picture: 'https://upload.wikimedia.org/wikipedia/ru/3/30/Iron_man_filmposter.jpg'
        },
        {
            id: 2,
            name: 'Titanic',
            year: '1020',
            genre: 'lovestory',
            picture: 'https://upload.wikimedia.org/wikipedia/ru/1/19/Titanic_%28Official_Film_Poster%29.png'
        },
        {
            id: 3,
            name: 'Iron Man',
            year: '2002',
            genre: 'fantactic',
            picture: 'https://upload.wikimedia.org/wikipedia/ru/3/30/Iron_man_filmposter.jpg'
        },
        {
            id: 4,
            name: 'Titanic',
            year: '1020',
            genre: 'lovestory',
            picture: 'https://upload.wikimedia.org/wikipedia/ru/1/19/Titanic_%28Official_Film_Poster%29.png'
        },
        {
            id: 5,
            name: 'Iron Man',
            year: '2002',
            genre: 'fantactic',
            picture: 'https://upload.wikimedia.org/wikipedia/ru/3/30/Iron_man_filmposter.jpg'
        },
        {
            id: 6,
            name: 'Titanic',
            year: '1020',
            genre: 'lovestory',
            picture: 'https://upload.wikimedia.org/wikipedia/ru/1/19/Titanic_%28Official_Film_Poster%29.png'
        },
        {
            id: 7,
            name: 'Iron Man',
            year: '2002',
            genre: 'fantactic',
            picture: 'https://upload.wikimedia.org/wikipedia/ru/3/30/Iron_man_filmposter.jpg'
        },
        {
            id: 8,
            name: 'Titanic',
            year: '1020',
            genre: 'lovestory',
            picture: 'https://upload.wikimedia.org/wikipedia/ru/1/19/Titanic_%28Official_Film_Poster%29.png'
        },]
    return (
        <View style={{ backgroundColor: 'black' }}>
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
            {/* <Ionicons name='accessibility' color='orange' />
            <MyText>{nativeText.welcom}</MyText> */}

            <View>
                <SwipeListView
                    data={movie}
                    renderItem={x =>
                        <View style={{ marginBottom: 8 }}>
                            <Movie.Card
                                key={x.item.id}
                                name={x.item.name}
                                year={x.item.year}
                                genre={x.item.genre}
                                picture={x.item.picture}
                                color='black'
                            />
                        </View>
                    }
                    renderHiddenItem={x =>
                        <View style={{ marginBottom: 8 }}>
                            <Movie.Back
                                key={x.item.id}
                                color='orange'
                                buttonColor='red'
                            />
                        </View>
                    }
                    disableRightSwipe={true}
                    rightOpenValue={-150}

                />
            </View>
            {/* <MyButton onPress={async () => console.log(await db?.getAllAsync('SELECT * FROM user'))}>
                <MyText>Show users</MyText>
            </MyButton>
            <MyButton onPress={async () => {
                await close()
                console.log(await deleteDatabaseAsync('movie-hub-mobile'))
            }}>
                <MyText>Drop database</MyText>
            </MyButton> */}
        </View >
    )
}