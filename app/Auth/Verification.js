import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OtpInput } from "react-native-otp-entry";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';

const Verification = ({ navigation }) => {
    const [value, setValue] = useState('')
    const [countryCode, setCountryCode] = useState('US');
    const [isSecure, setIsSecure] = useState(true);
    const timerRef = useRef(null);

    const phoneInputRef = useRef(null);
    const inset = useSafeAreaInsets()


    const handleTextChange = (text) => {
        setIsSecure(false);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setIsSecure(true);
        }, 1000);

        console.log("Current OTP:", text);
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
            <ImageBackground source={require('../../assets/images/above-banner.png')} style={styles.BGImg}>
                <View style={{ paddingTop: inset.top + 4, marginHorizontal: 16 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, paddingLeft: 0 }}>
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>
                    <Text style={{ marginTop: 20, fontFamily: fonts.IntBold, color: 'white', fontSize: 28, marginBottom: 18 }}>Verification Code</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 14 }}>We’ve sent a WhatsApp OTP to +91 XXXXXXXX.</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 14 }}>Enter the 6 digit code below to continue.</Text>
                </View>
            </ImageBackground>

            <View style={{ marginHorizontal: 16, flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <OtpInput
                        numberOfDigits={6}
                        focusColor="grey"
                        autoFocus={false}
                        hideStick={true}
                        placeholder="******"
                        blurOnFilled={true}
                        disabled={false}
                        type="numeric"
                        secureTextEntry={isSecure}
                        focusStickBlinkingDuration={500}
                        onFocus={() => console.log("Focused")}
                        onBlur={() => console.log("Blurred")}
                        onTextChange={handleTextChange}
                        onFilled={(text) => console.log(`OTP is ${text}`)}
                        textInputProps={{
                            accessibilityLabel: "One-Time Password",
                        }}
                        theme={{
                            containerStyle: styles.OTPcontainer,
                            pinCodeContainerStyle: styles.pinCodeContainer,
                            pinCodeTextStyle: styles.pinCodeText,
                            focusStickStyle: styles.focusStick,
                            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                            placeholderTextStyle: styles.placeholderText,
                            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                            disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
                        }}
                    />

                    <Text style={{ color: '#FF0004', fontFamily: fonts.IntMed, fontSize: 10, textAlign: 'center', marginTop: 20 }}>That code didn’t match. Please try again.</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Text style={{color: colors.primary, fontFamily: fonts.IntSB}}>Resend Code <Text>(30 sec)</Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('Auth/Success')} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: 12 + inset.bottom }]}>
                        <Text style={styles.WhiteBTNText}>Verify</Text>
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
        height: Dimensions.get('window').height / 100 * 30,
    },
    phoneContainer: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 16,
        marginTop: 20
    },
    textInput: {
        paddingVertical: 0,
        backgroundColor: '#fff',
        borderRadius: 16,
    },
    whiteBTN: {
        width: '100%',
        backgroundColor: '#9DA2A6',
        padding: 16,
        marginTop: 16,
        borderRadius: 15,
    },
    WhiteBTNText: {
        color: 'white',
        fontFamily: fonts.IntBold,
        fontSize: 16,
        textAlign: 'center',
    },
    activePinCodeContainer: {
        shadowColor: 'black',
        shadowOffset: 1,
    },
    pinCodeText: {
        fontWeight: fonts.IntBold,
    },
    OTPcontainer: {
        marginTop: 36,
    }
})

export default Verification;