import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, ProgressBarAndroid, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import useAuth from '../hooks/useAuth'
import { theme, images, icons } from '../constants';

const LoginScreen = () => {

    const { signinWithGoogle, signinWithFacebook, loading } = useAuth();

    if(!loading)
        return (       
            <View style={styles.container}>
                <StatusBar barStyle={theme.statusBarStyleLogin} backgroundColor={'transparent'} translucent={true}/>
                <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.container}>
                    <View style={styles.content}>
                        <Image 
                            source={images.logo}
                            style={styles.background}
                        />

                        <View style={styles.buttonsSection}>
                            <TouchableOpacity 
                                style={styles.loginButton}
                                onPress={signinWithGoogle}
                            >
                                <Image source={icons.google} style={styles.loginIcon}/>
                                <Text style={styles.loginText}>Login with google</Text>
                            </TouchableOpacity>
                            <View style={styles.spacer}/>
                            <TouchableOpacity 
                                style={styles.loginButton}
                                onPress={signinWithFacebook}
                            >
                                <Image source={icons.facebook} style={styles.loginIcon}/>
                                <Text style={styles.loginText}>Login with facebook</Text>
                            </TouchableOpacity>
                        </View>
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
    buttonsSection:{
        marginHorizontal: "20%",
    },
    loginButton:{
        backgroundColor:"white",
        height: 40,
        width: 200,
        marginHorizontal:"25%",
        borderRadius:15,
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"center"
    },
    loginText:{
        textAlign:"center",
        fontWeight:"700",
        color:theme.mainText,
    },
    loginIcon:{
        width:20,
        height:20,
        marginHorizontal:10,
    },
    spacer:{
        height:5,
    }
});

export default LoginScreen
