import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    onAuthStateChanged,
    signOut,
    signInWithCredential
} from 'firebase/auth';
import { auth } from '../../firebase';
import { Alert } from 'react-native';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() =>
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
            setLoadingInitial(false);
        })
        , []);

    const googleConfig = {
        androidClientId: '40078795061-49hp6u7sr33t2r6c3o2ngg4fascvsgac.apps.googleusercontent.com',
        iosClientId: '40078795061-l7psba8ef7h8cgiko6e478m24nh4v2p9.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        permissions: ['public_profile', 'gender', 'email', 'location']
    }

    const facebookConfig = {
            appId: '770754377234439',
    }

    const signinWithGoogle = async () => {
        setLoading(true);
        await Google.logInAsync(googleConfig).then(async (loginResult) => {
            if (loginResult.type === 'success') {
                const { idToken, accessToken } = loginResult;
                const credenrial = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(auth, credenrial);
            }
            else {
                return Promise.reject();
            }

        }).catch((error) => {
            console.error(error);
            setError(error);
        }).finally(() => setLoading(false));
    }

    const signinWithFacebook = async () => {
        setLoading(true);
        await Facebook.initializeAsync(facebookConfig);

        await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
        }).then( async (result)=>{
            if (result.type === 'success') {
                console.log("login success");
                const { token } = result;
                const credenrial = FacebookAuthProvider.credential(token);
                await signInWithCredential(auth, credenrial);
            } else {
                console.log("login cancel")
                return Promise.reject();
            }
        }).catch((error) => {
            console.error(error);
            setError(error);
        }).finally(() => setLoading(false));
    }

    const signout = () => {
        setLoading(true);
        signOut(auth)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        signinWithGoogle,
        signinWithFacebook,
        signout,
    }), [user, loading, error,]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
};

export default function useAuth() {
    return useContext(AuthContext)
}

