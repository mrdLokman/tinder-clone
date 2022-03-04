import React, { useState } from 'react'
import { Button, View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { images, theme } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth';
import { setDoc, doc, serverTimestamp } from '@firebase/firestore';
import { db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileSetupScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuth();

    const [pictureUrl, setPictureUrl] = useState(images.blankProfilePicture);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const formIncomplete = !pictureUrl || !job || !age;

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
            setPictureUrl(result.uri);
        }
    };

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
            
            <View style={styles.pickImageContainer}>
                {pictureUrl && <Image source={{ uri: pictureUrl }} style={{ width: 200, height: 200 }} />}
                <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                    <MaterialIcons name="add-photo-alternate" size={24} color='white' />
                </TouchableOpacity>
            </View>

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
    pickImageContainer:{
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fc8181'
    },
    pickImageButton:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});


export default ProfileSetupScreen
