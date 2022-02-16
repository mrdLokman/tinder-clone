import React from 'react'
import { View, Text, Button, ProgressBarAndroid } from 'react-native'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {

    const { signinWithGoogle, loading } = useAuth();

    if(!loading)
        return (
            <View style={{flex:1, alignItems:'center', justifyContent: 'space-around'}}>
                <Text>login to app</Text>
                <Button title="login" onPress={signinWithGoogle}/>
            </View>
        );
    else
        return(
            <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                <ProgressBarAndroid/>
            </View>
        );
    
}

export default LoginScreen
