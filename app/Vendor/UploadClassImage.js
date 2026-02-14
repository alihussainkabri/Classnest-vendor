import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';

const UploadClassImage = ({ navigation }) => {
    const [value, setValue] = useState('')
    const [countryCode, setCountryCode] = useState('US');
    const [enquiryType, setEnquiryType] = useState('');

    const phoneInputRef = useRef(null);
    const inset = useSafeAreaInsets()

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
            <ImageBackground source={require('../../assets/images/above-banner.png')} style={styles.BGImg}>
                <View style={{ paddingTop: inset.top + 4, marginHorizontal: 16 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, paddingLeft: 0 }}>
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>
                    <Text style={{ marginTop: 20, fontFamily: fonts.IntBold, color: 'white', fontSize: 28, marginBottom: 8 }}>Upload class image</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 14 }}>Show your class, students, or studio to attract more enquiries</Text>
                </View>
            </ImageBackground>

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ marginHorizontal: 16, }}>
                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 18, marginTop: 30 }}>Upload Images <Text style={{fontFamily:fonts.IntMed, fontSize: 12}}>(max : 10)</Text></Text>
                    
                    
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => router.push('Vendor/ReceiveEnquiries')} activeOpacity={.8} style={[styles.whiteBTN ,{ marginBottom: inset.bottom}]}>
                        <Text style={styles.WhiteBTNText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    BGImg: {
        width: '100%',
        height: Dimensions.get('window').height / 100 * 26,
    },
    phoneContainer: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 16,
        marginTop: 12
    },
    textInput: {
        paddingVertical: 0,
        backgroundColor: '#fff',
        borderRadius: 16,
    },
    whiteBTN: {
        width: '100%',
        backgroundColor: colors.primary,
        padding: 16,
        marginTop: 16,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
    },
    WhiteBTNText: {
        color: 'white',
        fontFamily: fonts.IntBold,
        fontSize: 16,
        textAlign: 'center',
    },
})

export default UploadClassImage;