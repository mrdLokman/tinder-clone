import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
    const navigation = useNavigation();
    const { signout } = useAuth();

    return (
        <View style={{flex:1, alignItems:'center', justifyContent: 'space-around'}}>
            <Text>home screen</Text>
            <Button title="go to chat" onPress={()=> navigation.navigate("Chat")}/>
            <Button title="log out" onPress={()=> signout()}/>
        </View>
    )
}

export default HomeScreen
