import { Centred, Column, MyImage, MyText, Row } from "@/components/constants";
import Logo from "@/components/Logo";
import { useMovie } from "@/hooks/useMovie";
import useNativeText from "@/hooks/useNativeText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Movie() {
    const params = useLocalSearchParams<{ title: string }>()
    const movie = useMovie(params.title)
    const nativeText = useNativeText()

    if (movie.loading) return <Centred style={{ backgroundColor: 'black', height: '100%' }}><Text>{nativeText.loading}</Text></Centred>
    return (
        <View style={{ backgroundColor: 'black', height: '100%', padding: 10 }}>
            <Row style={{ width: '100%' }}>
                <Logo />
                <MaterialIcons
                    name="language"
                    color='orange'
                    size={40}
                    onPress={() => nativeText.setLanguage(nativeText.language === 'ru' ? 'en' : 'ru')} />
            </Row>
            <Column style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <MyText style={{ fontSize: 36 }}>{movie.title}</MyText>
                <MyImage source={movie.poster} style={{
                    width: 150,
                    height: 200,
                }} />
                <MyText style={{ fontSize: 20 }}>{nativeText.years}: {movie.years}</MyText>
                <MyText style={{ fontSize: 20 }}>{nativeText.runtime}: {movie.runtime}</MyText>
                <MyText style={{ fontSize: 20 }}>{nativeText.languagem}: {movie.language}</MyText>
                <MyText style={{ fontSize: 20 }}>{nativeText.genre}: {movie.genre}</MyText>
                <MyText style={{ fontSize: 20 }}>{nativeText.actors}: {movie.actors}</MyText>
                <MyText style={{ fontSize: 20 }}>{nativeText.director}: {movie.director}</MyText>
                <MyText style={{ fontSize: 15 }}>{nativeText.plot}: {movie.plot}</MyText>
            </Column >
        </View >
    )
} 