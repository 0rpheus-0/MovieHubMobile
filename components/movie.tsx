import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Column, MyImage, MyText, Row } from "./constants";

export namespace Movie {
    export const Card = (props: {
        name: string,
        year: string,
        genre: string,
        picture: string,
        color: string,
    }) =>

        <Column style={{
            left: 0,
            right: 0,
            backgroundColor: props.color,
            padding: 16,
            gap: 10,
            alignItems: 'flex-start'
        }}>
            <Row style={{ width: '100%', height: 'auto', justifyContent: 'space-between' }}>
                <MyImage source={props.picture} />
                <Column>
                    <MyText>{props.name}</MyText>
                    <Row>
                        <MyText>{props.genre} </MyText>
                        <MyText>{props.year}</MyText>
                    </Row>
                </Column>
            </Row>
        </Column>

    export const Back = (props: {
        color: string,
        buttonColor: string
    }) =>
        <Row style={{
            height: '100%',
            padding: 4,
            justifyContent: 'flex-end',
            backgroundColor: props.color,
            overflow: 'hidden'

        }}>
            <Row >
                <MaterialIcons name="delete" size={36} />
            </Row>
        </Row >

}
export default Movie