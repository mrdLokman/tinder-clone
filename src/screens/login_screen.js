import React from 'react'
import { View, Text, ProgressBarAndroid, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {

    const { signinWithGoogle, loading } = useAuth();

    if(!loading)
        return (
            <View style={styles.container}>
                <ImageBackground
                    resizeMode="cover"
                    source={{ uri: "https://reactjs.org/logo-og.png"}}
                    style={styles.background}
                >   
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress={signinWithGoogle}
                    >
                        <Text style={styles.loginText}>Sign-in with google</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            
        );
    else
        return(
            <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                <ProgressBarAndroid/>
            </View>
        );
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    background:{
        flex:1,
        justifyContent: "center"
    },
    loginButton:{
        position:"absolute",
        backgroundColor:"white",
        bottom:120,
        height: 40,
        width:"50%",
        marginHorizontal:"25%",
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center"
    },
    loginText:{
        textAlign:"center",
        fontWeight:"700"
    }
});

export default LoginScreen
