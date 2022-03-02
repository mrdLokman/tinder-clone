import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { images, theme } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth';
import { setDoc, doc, serverTimestamp } from '@firebase/firestore';
import { db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';


const ProfileSetupScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuth();

    const [pictureUrl, setPictureUrl] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const formIncomplete = !pictureUrl || !job || !age;

    const updateUserProfile = () => {
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoUrl: pictureUrl,
            job: job,
            age: age,
            timeStamp: serverTimestamp()
        })
        .then(() => navigation.navigate('Home'))
        .catch((error)=>{
            alert(error.message);
        });
    }

    return (

        <SafeAreaView style={styles.container}>
            <Image
                style={styles.logo}
                resizeMode='contain'
                source={images.logoText}
            />
            <Text style={styles.welcomeText}>welcome {user.displayName}</Text>

            <Text style={styles.stepLabel}>Step 1: The Profile picture</Text>
            <TextInput
                style={styles.stepInput}
                placeholder="Enter a profile picture URL"
                value={pictureUrl}
                onChangeText={(text) =>setPictureUrl(text)}
            />

            <Text style={styles.stepLabel}>Step 2: The Job</Text>
            <TextInput
                style={styles.stepInput}
                placeholder="What is your job?"
                value={job}
                onChangeText={(text) =>setJob(text)}
            />

            <Text style={styles.stepLabel}>Step 3: The age</Text>
            <TextInput
                style={styles.stepInput}
                placeholder="How old are you?"
                value={age}
                onChangeText={(text) =>setAge(text)}
                maxLength={2}
                keyboardType='numeric'
            />

            <TouchableOpacity
                disabled={formIncomplete}
                style={[styles.submitButton, formIncomplete? {backgroundColor: '#cbd5e0'} : {backgroundColor: '#fc8181'}]}
                onPress={updateUserProfile}
            >
                <Text style={styles.submitText}>
                    Update profile
                        </Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        alignItems: "center",
    },
    logo: {
        width: "100%",
        height: 70,
    },
    welcomeText: {
        color: theme.secondaryText,
        fontSize: 14,
        marginBottom: 20,
    },
    stepLabel: {
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10,
        color: '#fc8181'
    },
    stepInput: {
        paddingBottom: 5,
        textAlign: 'center',
    },
    submitButton: {
        justifyContent: 'center',
        width: "50%",
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        bottom: 50,
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
});


export default ProfileSetupScreen
