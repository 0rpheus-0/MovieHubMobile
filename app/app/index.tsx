
import { Column, Header, MyButton, MyText, MyTextInput, Row } from '@/components/constants';
import Logo from '@/components/Logo';
import Movie from '@/components/movie';
import useNativeText from '@/hooks/useNativeText';
import { useLoggedSession } from '@/hooks/useSession';
import { useUser } from '@/hooks/useUser';

import { useDatabase } from '@/storages/useDatabase';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useState } from 'react';
import { TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";



export default function AppIndex() {
    const nativeText = useNativeText()
    const database = useDatabase()
    const { db, close } = database;
    (window as any).db = database
    const { username } = useLoggedSession()
    const { movies, addMovie, removeMovie } = useUser(username)
    const [addMovieName, setAddMovieName] = useState('');
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    return (
        <View style={{ backgroundColor: 'black', height: "100%" }}>
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
                        <MyTextInput
                            style={{ flexGrow: 1 }}
                            placeholder={nativeText.movieName}
                            value={addMovieName}
                            onChangeText={setAddMovieName} />
                        <MyButton
                            style={{ width: 50 }}
                            onPress={async () => {
                                console.log(addMovieName)
                                addMovie(addMovieName)
                            }}>
                            <MyText style={{ color: 'black' }} >+</MyText>
                        </MyButton>
                    </Row>
                </Column>
            </Header>
            <SwipeListView
                data={movies}
                renderItem={x =>
                    <View style={{ marginBottom: 8 }}>
                        <Link
                            href={{
                                pathname: '/app/movie/[title]',
                                params: { title: x.item.title }
                            }}
                            asChild >
                            <TouchableOpacity>
                                <Movie.Card
                                    key={x.item.title}
                                    name={x.item.title.length > 15 ? `${x.item.title.substring(0, 15)}...` : x.item.title}
                                    years={x.item.years}
                                    genre={x.item.genre}
                                    poster={x.item.poster}
                                    color='black'
                                />
                            </TouchableOpacity>
                        </Link>
                    </View>
                }
                renderHiddenItem={x =>
                    <View style={{ marginBottom: 8 }}>
                        <TouchableOpacity
                            onLongPress={() => {
                                console.log(x.item.title);
                                removeMovie(x.item.title)
                            }}>
                            <Movie.Back
                                key={x.item.title}
                                color='orange'
                                buttonColor='red'
                            />
                        </TouchableOpacity>
                    </View>
                }
                disableRightSwipe={true}
                rightOpenValue={- 150}
            />
        </View>
    )
}