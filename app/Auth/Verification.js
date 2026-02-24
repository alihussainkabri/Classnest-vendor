import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OtpInput } from "react-native-otp-entry";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { colors, fonts } from '../../config/Config';
import { userContext } from '../../context/UserContext';
import { url } from '../../helpers';

const Verification = ({ navigation }) => {
    const { setUser } = useContext(userContext)
    const [isSecure, setIsSecure] = useState(true);
    const timerRef = useRef(null);
    const { mobile_number, newly_created } = useLocalSearchParams()
    const [otp, setOTP] = useState("")
    const [activeBtn, setActiveBtn] = useState(false)

    const phoneInputRef = useRef(null);
    const inset = useSafeAreaInsets()


    const handleTextChange = (text) => {
        setIsSecure(false);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setIsSecure(true);
        }, 1000);

        console.log("Current OTP:", text);
        setOTP(text)
    };

    const [seconds, setSeconds] = useState(30);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (seconds === 0) {
            setEnabled(true);
            return;
        }

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    const handleResend = async () => {
        if (!enabled) return;

        Toast.success("Code resent!");
        setSeconds(30);
        setEnabled(false);

        const formData = new FormData()
        formData.append("mobile_number", mobile_number)
        formData.append("module", 'vendor')

        const response = await fetch(url + "generate-otp", {
            method: 'POST',
            body: formData
        })

        if (response.ok == true) {
            const data = await response.json()
            if (data.status == 200) {
                Toast.success(data?.message)
            } else {
                Toast.error(data?.message)
            }
        }
    };

    async function successUpload(token) {
        const response = await fetch(url + "fetch-current-vendor-progress", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.ok == true) {
            const data = await response.json()

            if (data?.status == 200) {
                let totalCompleted = 0;
                let totalFields = 0;

                data.list.forEach(item => {
                    totalFields += item.number_of_checker;
                    totalCompleted += item.total_field;
                });

                const percentage = ((totalCompleted / totalFields) * 100).toFixed(2);

                setTimeout(() => {
                    router.push({
                        pathname: 'Vendor/ProfileStatus',
                        params: {
                            percentage,
                            list: JSON.stringify(data?.list)
                        }
                    });
                }, 0);
            } else {
                setTimeout(() => {
                    router.push({
                        pathname: 'Vendor/ProfileStatus',
                        params: {
                            percentage: 0,
                            list: JSON.stringify([])
                        }
                    });
                }, 0);
            }
        }
    }

    async function verifyOTP() {
        const formData = new FormData()
        formData.append("mobile_number", mobile_number)
        formData.append("otp", otp)

        const response = await fetch(url + "verify-otp", {
            method: 'POST',
            body: formData
        })

        if (response.ok == true) {
            const data = await response.json()
            console.log(data)
            if (data.status == 200) {
                setUser(data?.user_data)
                AsyncStorage.setItem("classnest_vendor", JSON.stringify(data?.user_data))
                Toast.success(data?.message)



                if (newly_created == "true") {
                    setTimeout(() => {
                        router.push('Auth/Success')
                    }, 200);
                } else {
                    successUpload(data?.user_data?.token)
                }
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
                    <Text style={{ marginTop: 20, fontFamily: fonts.IntBold, color: 'white', fontSize: 28, marginBottom: 18 }}>Verification Code</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 14 }}>We’ve sent a WhatsApp OTP to +91 {mobile_number}.</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 14 }}>Enter the 6 digit code below to continue.</Text>
                </View>
            </ImageBackground>

            <View style={{ marginHorizontal: 16, flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <OtpInput
                        numberOfDigits={4}
                        focusColor="grey"
                        autoFocus={false}
                        hideStick={true}
                        placeholder="******"
                        blurOnFilled={true}
                        disabled={false}
                        type="numeric"
                        focusStickBlinkingDuration={500}
                        onFocus={() => console.log("Focused")}
                        onBlur={() => console.log("Blurred")}
                        onTextChange={handleTextChange}
                        onFilled={() => setActiveBtn(true)}
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
                    <TouchableOpacity disabled={!enabled} onPress={handleResend}>
                        <Text style={{ color: enabled ? colors.primary : "gray", fontFamily: fonts.IntSB }}>
                            Resend Code{" "}
                            {!enabled && <Text>({seconds} sec)</Text>}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (otp.length == 4) {
                            verifyOTP()

                        } else {
                            Toast.error("Please enter OTP")
                        }
                    }} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: 12 + inset.bottom, backgroundColor: activeBtn ? colors.primary : '#9DA2A6', }]}>
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
        justifyContent: 'space-evenly'
    }
})

export default Verification;