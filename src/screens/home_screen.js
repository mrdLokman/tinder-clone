import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, theme, images } from '../constants'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { onSnapshot, doc, collection, setDoc, getDocs, query, where } from '@firebase/firestore'
import { db } from '../../firebase'


const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, signout } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [profile, setProfile] = useState(null);
    const swiperRef = useRef(null);

    useLayoutEffect(() => {
        const unsub = onSnapshot(doc(db, 'users', user.uid), snapshot => {
            if (!snapshot.exists()) navigation.navigate('ProfileSetup');
            else setProfile(snapshot.data());
        });

        return unsub;
    }, []);

    useEffect(() => {
        let unsub;

        const fetchCards = async () => {
            const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            );
            const likes = await getDocs(collection(db, 'users', user.uid, 'likes')).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            );
            
            const excludedIds = [user.uid, ...passes, ...likes];

            console.log(excludedIds);

            unsub = onSnapshot(
                query(collection(db, 'users'), where("id", "not-in", excludedIds)),
                (snapshot) => {
                    //console.log(snapshot.docs);
                    setProfiles(
                        snapshot.docs
                            .map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            }))
                    );
                }
            );
        }

        fetchCards();
        return unsub;
    }, []);

    const swipeLeft = async (cardIndex) => {
        if (!profiles[cardIndex]) return;
        const swipedUser = profiles[cardIndex];
        setDoc(doc(db, 'users', user.uid, 'passes', swipedUser.id), swipedUser);
    }

    const swipeRight = async (cardIndex) => {
        if (!profiles[cardIndex]) return;
        const swipedUser = profiles[cardIndex];
        setDoc(doc(db, 'users', user.uid, 'likes', swipedUser.id), swipedUser);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={theme.statusBarStyleOther} backgroundColor={'transparent'} translucent={true} />
            { /* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={signout}>
                    <Image
                        style={styles.profilePicture}
                        source={{ uri: profile ? profile.photoUrl : user.photoURL }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfileSetup')}
                >
                    <Image
                        style={styles.tinderLogo}
                        source={icons.tinder}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name="chatbubbles-sharp" size={35} color={theme.secondary} />
                </TouchableOpacity>
            </View>
            { /* End Header */}

            { /* Swiper */}
            <View style={styles.swipeSection}>
                <Swiper
                    ref={swiperRef}
                    containerStyle={styles.swaipeContainer}
                    stackSize={5}
                    cards={profiles}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
                    onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: 'right',
                                    color: 'red',
                                }
                            },
                        },
                        right: {
                            title: "LIKE",
                            style: {
                                label: {
                                    textAlign: 'left',
                                    color: 'green',
                                }
                            },
                        },
                    }}
                    renderCard={(card) => card ? (
                        <View key={card.id} style={styles.cardContainer}>
                            <Image
                                source={{ uri: card.photoUrl }}
                                style={styles.cardPhoto}
                            />
                            <View style={styles.cardInfoContainer}>
                                <View>
                                    <Text style={styles.cardName}>{card.displayName}</Text>
                                    <Text style={styles.cardJob}>{card.job}</Text>
                                </View>
                                <Text style={styles.cardAge}>{card.age}</Text>
                            </View>
                        </View>
                    ) : (
                            <View style={styles.emptyCardContainer}>
                                <Image
                                    source={images.sadFace}
                                    style={styles.emptyCardPhoto}
                                />
                                <Text style={styles.emptyCardName}>No more profiles!</Text>
                            </View>
                        )}
                />
            </View>
            { /* End Swiper */}

            { /* Buttons */}
            <View style={styles.buttonsSection}>
                <TouchableOpacity
                    style={[styles.swiperButton, styles.nopeButton]}
                    onPress={() => swiperRef.current.swipeLeft()}
                >
                    <Entypo
                        name='cross'
                        size={24}
                        color='red'
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.swiperButton, styles.likeButton]}
                    onPress={() => swiperRef.current.swipeRight()}
                >
                    <AntDesign
                        name='heart'
                        size={24}
                        color='green'
                    />
                </TouchableOpacity>
            </View>
            { /* End Buttons */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    profilePicture: {
        width: 35,
        height: 35,
        borderRadius: 17,
    },
    tinderLogo: {
        width: 50,
        height: 50,
    },
    swipeSection: {
        flex: 1,
        marginTop: -20,
    },
    swaipeContainer: {
        backgroundColor: 'transparent',
    },
    cardContainer: {
        backgroundColor: "white",
        height: "75%",
        borderRadius: 25,
        position: 'relative'
    },
    emptyCardContainer: {
        display: 'flex',
        backgroundColor: "white",
        height: "75%",
        borderRadius: 25,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardPhoto: {
        height: "100%",
        width: "100%",
        borderRadius: 25,
    },
    emptyCardPhoto: {
        height: 100,
        width: 100,
        marginBottom: 20,
    },
    cardInfoContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 80,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme.mainText,
    },
    emptyCardName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme.mainText,
    },
    cardAge: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.mainText,
    },
    cardJob: {
        fontSize: 16,
        color: theme.secondaryText,
    },
    buttonsSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 25
    },
    swiperButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    nopeButton: {
        backgroundColor: '#fed7d7',
    },
    likeButton: {
        backgroundColor: '#c6f6d5',
    },
});

export default HomeScreen
