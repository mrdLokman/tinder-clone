import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, ProgressBarAndroid, Image, TouchableOpacity, StyleSheet } from 'react-native'
import useAuth from '../hooks/useAuth'
import { theme, images } from '../constants';

const LoginScreen = () => {

    const { signinWithGoogle, loading } = useAuth();

    if(!loading)
        return (
            <View style={styles.container}>
                <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.container}>
                    <View style={styles.content}>
                        <Image source={images.logo} style={styles.background}/>
                    
                        <TouchableOpacity 
                            style={styles.loginButton}
                            onPress={signinWithGoogle}
                        >
                            <Text style={styles.loginText}>Sign-in with google</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
            
        );
    else
        return(
            <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                <ProgressBarAndroid color={theme.primary}/>
            </View>
        );
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    background:{
        width:250,
        height:250,
    },
    content:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-around"
    },
    loginButton:{
        backgroundColor:"white",
        height: 40,
        width:"50%",
        marginHorizontal:"25%",
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center"
    },
    loginText:{
        textAlign:"center",
        fontWeight:"700",
        color:"#424242"
    }
});

export default LoginScreen
