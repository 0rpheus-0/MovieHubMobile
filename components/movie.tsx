import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Column, MyImage, MyText, Row } from "./constants";

const log = <T,>(x: T) => {
    console.log(x)
    return x
}

export namespace Movie {
    export const Card = (props: {
        name: string,
        years: string,
        genre: string,
        poster: string,
        color: string,
    }) =>
        <Row style={{
            width: '100%',
            justifyContent: 'space-between',
            backgroundColor: props.color
        }}>
            <MyImage source={props.poster} />
            <Column>
                <MyText style={{ fontSize: 25, flexWrap: 'wrap' }}>{props.name}</MyText>
                <Row>
                    <MyText>{props.genre} </MyText>

                    <MyText>{props.years}</MyText>
                </Row>
            </Column>
        </Row>

    export const Back = (props: {
        color: string,
        buttonColor: string
    }) =>
        <Row style={{
            height: '100%',
            padding: 20,
            justifyContent: 'flex-end',
            backgroundColor: props.color,
            overflow: 'hidden'
        }}>
            <Row >
                <MaterialIcons name="delete" size={40} />
            </Row>
        </Row >

}
export default Movie