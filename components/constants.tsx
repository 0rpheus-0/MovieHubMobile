import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const PhysicalScreen = (props: View['props']) => <Centred
    {...props}
    style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...props.style as {},
    }}
/>


export const Screen = (props: View['props']) => <Centred
    {...props}
    style={{
        flexGrow: 1,
        flex: 1,
        position: 'relative',
        backgroundColor: 'black',
        width: '100%',
        ...props.style as {},
    }}
/>

export const Header = (props: View['props']) => <View
    {...props}
    style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        ...props.style as {},
    }}
/>

export const Centred = (props: View['props']) => <View
    {...props}
    style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style as {}
    }}
/>

export const MyText = (props: Text['props']) => <Text
    {...props}
    style={{
        color: 'white',
        ...props.style as {},
    }}

/>

export const MyButton = (props: TouchableOpacity['props']) => <TouchableOpacity
    {...props}
    style={{
        width: 180,
        backgroundColor: 'orange',
        padding: 5,
        borderRadius: 3,
        height: 40,
        ...props.style as {},
    }}
>
    <Centred style={{ height: '100%' }}>
        {props.children}
    </Centred>
</TouchableOpacity>

export const MyTextInput = (props: TextInput['props']) => <TextInput
    {...props}
    style={{
        width: 180,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 3,
        height: 40,
        ...props.style as {},
    }}
/>