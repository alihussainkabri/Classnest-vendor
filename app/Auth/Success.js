import { Ionicons } from '@expo/vector-icons'
import { router } from "expo-router"
import React from 'react'
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, fonts } from '../../config/Config'

const Success = () => {
    const inset = useSafeAreaInsets()

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
            <ImageBackground source={require('../../assets/images/successBG.png')} style={styles.BGImg}>
                <View>
                    <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, paddingLeft: 0, marginTop: 32 }}>
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>
                    
                    <Image source={require('../../assets/images/verified.png')} style={{ width: '100%', height: 250, resizeMode: 'contain', marginTop: 64 }} />
                    <Text style={{ fontFamily: fonts.IntSB, fontSize: 24, textAlign: 'center', color: 'white', marginTop: -16 }}>“You’re all set!”</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontFamily: fonts.IntMed, fontSize: 12, textAlign: 'center', color: 'white' }}>Tell us a bit about your interests to get better class recommendations.</Text>
                    <TouchableOpacity onPress={() => router.push('Vendor/SetupScreen1')} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: 30 + inset.bottom, }]}>
                        <Text style={styles.WhiteBTNText}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    BGImg: {
        backgroundColor: colors.primary,
        width: '100%',
        height: Dimensions.get('window').height,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    whiteBTN: {
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
        marginTop: 18,
        borderRadius: 15
    },
    WhiteBTNText: {
        color: colors.primary,
        fontFamily: fonts.IntBold,
        fontSize: 16,
        textAlign: 'center',
    }
})

export default Success;