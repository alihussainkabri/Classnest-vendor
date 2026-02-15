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
import { useRef, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';

const ReceiveEnquiries = ({ navigation }) => {
    const {class_id} = useLocalSearchParams()
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
                                    'Monday',
                                    'Tuesday',
                                    'Wednesday',
                                    'Thursday',
                                    'Friday',
                                    'Saturday',
                                    'Sunday',
                                ].map(day => (
                                    <SelectItem key={day} label={day} value={day} />
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

                    <Checkbox style={{ marginLeft: 16, marginTop: 16 }} isDisabled={false} isInvalid={false} size="lg">
                        <CheckboxIndicator style={{ borderRadius: 0, borderWidth: 1 }}>
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel style={{marginLeft: 8}}><Text style={{ fontFamily: fonts.IntMed, fontSize: 10, color: '#666668' }}>Use this number for WhatsApp as well</Text></CheckboxLabel>
                    </Checkbox>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => router.push('Vendor/UploadClassImage')} activeOpacity={.8} style={[styles.whiteBTN ,{ marginBottom: inset.bottom}]}>
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