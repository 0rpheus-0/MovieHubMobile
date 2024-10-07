import React from 'react';
import { Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={{ alignItems: "center" }}>
            <Text style={{ color: 'white', fontSize: 30 }}>
                Movie <Text style={{ color: 'orange' }}>Hub</Text>
            </Text>
        </View>
    );
}