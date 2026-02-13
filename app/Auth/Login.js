import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';

const Login = ({ navigation }) => {
    const [value, setValue] = useState('')
    const [countryCode, setCountryCode] = useState('US');

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
                    <Text style={{ marginTop: 20, fontFamily: fonts.IntBold, color: 'white', fontSize: 28, marginBottom: 18 }}>Login</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 14 }}>Enter your mobile number to continue</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 14 }}>We’ll send a <Text style={{ fontFamily: fonts.IntBold }}>WhatsApp</Text> OTP to verify.</Text>
                </View>
            </ImageBackground>

            <View style={{ marginHorizontal: 16, flex: 1, justifyContent: 'space-between' }}>
                <View style={{}}>
                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 26 }}>Phone Number</Text>
                    <PhoneInput
                        key={countryCode}
                        ref={phoneInputRef}
                        defaultValue={value}
                        defaultCode={countryCode}
                        layout="first"
                        onChangeText={(text) => { setValue(text) }}
                        // onChangeFormattedText={(text) => {
                        //     setFormattedValue(text);
                        // }}
                        withShadow
                        autoFocus
                        withFlag={true}
                        containerStyle={styles.phoneContainer}
                        textContainerStyle={styles.textInput}
                        countryPickerProps={{
                            withEmoji: true,
                            withFlag: true,
                            withAlphaFilter: true,
                            withFilter: true,
                        }}
                        placeholder='Enter 10-digit mobile number'
                        flagButtonStyle={{ backgroundColor: '#E6EEFF', borderRadius: 16 }}
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Checkbox isDisabled={false} isInvalid={false} size="md">
                        <CheckboxIndicator style={{ borderRadius: 0 }}>
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel><Text style={{ fontFamily: fonts.IntMed, fontSize: 9, color: '#666668' }}>By continuing, you agree to the Terms & Privacy Policy.</Text></CheckboxLabel>
                    </Checkbox>

                    <TouchableOpacity onPress={() => router.push('Auth/Verification')} activeOpacity={.8} style={styles.whiteBTN}>
                        <Text style={styles.WhiteBTNText}>Continue</Text>
                    </TouchableOpacity>

                    <Text style={{ fontFamily: fonts.IntMed, fontSize: 9, color: '#9DA2A6', marginTop: 4, marginBottom: 12 + inset.bottom }}>Your gateway to the best classes nearby</Text>
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
        backgroundColor: colors.primary,
        padding: 16,
        marginTop: 16,
        marginBottom: 8,
        borderRadius: 15,
    },
    WhiteBTNText: {
        color: 'white',
        fontFamily: fonts.IntBold,
        fontSize: 16,
        textAlign: 'center',
    }
})

export default Login;