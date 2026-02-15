import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger
} from '@/components/ui/select';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useRef, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { colors, fonts } from '../../config/Config';
import { userContext } from '../../context/UserContext';
import { url } from '../../helpers';

const ReceiveEnquiries = ({ navigation }) => {
    const { class_id } = useLocalSearchParams()
    const [enquiryType, setEnquiryType] = useState('');
    const [checked, setChecked] = useState(true);
    const { user } = useContext(userContext)

    // phone number state
    const [value, setValue] = useState('')
    const [countryCode, setCountryCode] = useState('IN');
    
    // whatsapp state
    const [whatsapp,setWhatsapp] = useState("")


    const phoneInputRef = useRef(null);
    const inset = useSafeAreaInsets()

    async function submit() {

        const formData = new FormData()
        formData.append("enquiry_mode", enquiryType)
        formData.append("calling_number", value)
        formData.append("whatsapp_number", checked ? value : whatsapp)

        const response = await fetch(url + "add-recieve-inquiry-class/" + class_id, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${user?.token}`
            },
            body : formData
        })

        if (response.ok == true){
            const data = await response.json()

            if (data?.status == 200){
                Toast.success(data?.message)
                setTimeout(() => {
                   router.push({
                    pathname : 'Vendor/UploadClassImage',
                    params : {
                        class_id
                    }
                   }) 
                }, 200);
            }else{
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
                    <Text style={{ marginTop: 20, fontFamily: fonts.IntBold, color: 'white', fontSize: 28, marginBottom: 18 }}>Let’s List Your First Class</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 14 }}>Get started by adding your first class details.</Text>
                </View>
            </ImageBackground>

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ marginHorizontal: 16, }}>
                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 30 }}>Choose how you want to receive enquiries</Text>
                    <Select selectedValue={enquiryType} onValueChange={(value) => setEnquiryType(value)} style={{ marginTop: 10, }}>
                        <SelectTrigger style={{ justifyContent: 'space-between', borderRadius: 12, borderWidth: 1, borderColor: '#C6C9D2', height: 56 }} variant="outline" size="md">
                            <SelectInput placeholder="Select Enquiry Type" fontFamily={fonts.IntMed} fontSize={13} style={{ color: '#666D80' }} />
                            <AntDesign name="down" size={16} color="#C6C9D2" style={{ marginHorizontal: 12 }} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                {[
                                    {
                                        label: 'Phone Call Only',
                                        value: 'phone'
                                    }, {
                                        label: 'Whatsapp Only',
                                        value: 'whatsapp'
                                    }
                                    , {
                                        label: 'Phone & Whatsapp (Recommended)',
                                        value: 'both'
                                    }

                                ].map(day => (
                                    <SelectItem key={day?.value} label={day?.label} value={day?.value} />
                                ))}
                            </SelectContent>
                        </SelectPortal>
                    </Select>

                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 18 }}>Phone Number</Text>
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
                        placeholder='Enter your phone number'
                        flagButtonStyle={{ backgroundColor: '#E6EEFF', borderRadius: 16 }}
                    />


                    {!checked && <>

                        <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 18 }}>Whatsapp Number</Text>
                        <PhoneInput
                            key={countryCode}
                            ref={phoneInputRef}
                            defaultValue={whatsapp}
                            defaultCode={countryCode}
                            layout="first"
                            onChangeText={(text) => { setWhatsapp(text) }}
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
                            placeholder='Enter your whatsapp number'
                            flagButtonStyle={{ backgroundColor: '#E6EEFF', borderRadius: 16 }}
                        />
                    </>}

                    {(enquiryType == 'whatsapp' || enquiryType == 'both') && <Checkbox isChecked={checked} onChange={() => setChecked(!checked)} style={{ marginLeft: 16, marginTop: 16 }} isDisabled={false} isInvalid={false} size="lg">
                        <CheckboxIndicator style={{ borderRadius: 0, borderWidth: 1 }}>
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel style={{ marginLeft: 8 }}><Text style={{ fontFamily: fonts.IntMed, fontSize: 10, color: '#666668' }}>Use this number for WhatsApp as well</Text></CheckboxLabel>
                    </Checkbox>}
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        let error = 0;

                        if (enquiryType && value){
                            if (!checked){
                                if (whatsapp){

                                }else{
                                    error = error + 1
                                }
                            }
                        }else{
                            error = error + 1
                        }

                        if (error == 0){
                            submit()
                        }else{
                            Toast.error("Please fill all details")
                        }

                    }} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: inset.bottom }]}>
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
        height: Dimensions.get('window').height / 100 * 25,
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

export default ReceiveEnquiries;