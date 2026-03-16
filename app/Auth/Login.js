import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CountryPicker from "react-native-country-picker-modal";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { colors, fonts } from '../../config/Config';
import { url } from '../../helpers';

const Login = ({ navigation }) => {
    const [value, setValue] = useState('')
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setCallingCode] = useState("91");
    const [checked, setChecked] = useState(false);

    const phoneInputRef = useRef(null);
    const inset = useSafeAreaInsets()

    const onSelect = (country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
    };

    async function generateOTP() {
        const formData = new FormData()
        formData.append("mobile_number", value)
        formData.append("module", 'vendor')

        const response = await fetch(url + "generate-otp", {
            method: 'POST',
            body: formData
        })

        if (response.ok == true) {
            const data = await response.json()
            console.log(data)
            if (data.status == 200) {
                Toast.success(data?.message)
                setTimeout(() => {
                    router.push({
                        pathname: 'Auth/Verification',
                        params: {
                            mobile_number: value,
                            newly_created: data?.newly_created
                        }
                    })
                }, 200);
            } else {
                Toast.error(data?.message)
            }
        }
    }



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
                    {/* <PhoneInput
                        key={countryCode}
                        ref={phoneInputRef}
                        defaultValue={value}
                        defaultCode={countryCode}
                        layout="first"
                        onChangeText={(text) => { setValue(text) }}
                        withShadow={false}
                        autoFocus
                        withFlag={true}
                        containerStyle={styles.phoneContainer}
                        textContainerStyle={styles.textInput}
                        countryPickerProps={{
                            withEmoji: false,
                            withFlag: true,
                            withAlphaFilter: true,
                            withFilter: true,
                            flagSize: 20,
                            withFlagButton: true,
                        }}
                        placeholder='Enter 10-digit mobile number'
                        flagButtonStyle={{ backgroundColor: '#E6EEFF', borderRadius: 16, width: 70, justifyContent: 'center' }}
                        renderDropdownImage={<Text style={{ fontSize: 16 }}>▼</Text>}
                    /> */}
                    <View style={[styles.phoneContainer, { flexDirection: 'row' }]}>
                        <View style={styles.flagBox}>
                            <CountryPicker
                                countryCode={countryCode}
                                withFilter
                                withFlag
                                withCallingCode={false}
                                withEmoji={true}
                                onSelect={onSelect}
                            />
                            <Entypo name="chevron-small-down" size={18} color="black" style={{ marginLeft: -14 }} />
                        </View>
                        <Input
                            variant="none"
                            size="lg"
                            isRequired
                            style={{ flex: 1 }}
                        >
                            <InputField value={value} keyboardType="phone-pad" onChangeText={setValue} placeholder="Enter 10-digit mobile number" style={{ color: '#787878', fontSize: 15, fontFamily: fonts.IntReg, paddingLeft: 16 }} />
                        </Input>
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Checkbox
                        onChange={(isChecked) => setChecked(isChecked)} isDisabled={false} isInvalid={false} size="md">
                        <CheckboxIndicator style={{ borderRadius: 0 }}>
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel><Text style={{ fontFamily: fonts.IntMed, fontSize: 9, color: '#666668' }}>By continuing, you agree to the Terms & Privacy Policy.</Text></CheckboxLabel>
                    </Checkbox>

                    <TouchableOpacity onPress={() => {
                        if (value.length == 10 && countryCode && checked) {
                            generateOTP()
                        } else {
                            Toast.error("Please fill all details")
                        }
                    }} activeOpacity={.8} style={styles.whiteBTN}>
                        <Text style={styles.WhiteBTNText}>Continue</Text>
                    </TouchableOpacity>

                    <Text style={{ fontFamily: fonts.IntMed, fontSize: 9, color: '#9DA2A6', marginTop: 4, marginBottom: 12 + inset.bottom }}>Your gateway to the best classes nearby</Text>
                </View>
            </View>
        </View >
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
    flagBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E6EEFF",
        paddingHorizontal: 12,
        borderRadius: 16,
        height: 60,
        marginLeft: -1
    },
    phoneContainer: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 16,
        marginTop: 20,
        alignItems: 'center'
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