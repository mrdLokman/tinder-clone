import React from 'react'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';

export default function MyComponent() {
    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Text>Hello Tailwind</Text>
        </View>
    )
}

