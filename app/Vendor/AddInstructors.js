import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
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
import { useContext, useState } from 'react';
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { colors, fonts } from '../../config/Config';
import { userContext } from '../../context/UserContext';
import { url } from '../../helpers';

const AddInstructors = () => {
    const inset = useSafeAreaInsets()
    const { class_id } = useLocalSearchParams()

    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [language, setLanguage] = useState('')
    const {user} = useContext(userContext)

    async function addInstructor() {
        if (name && gender && age && language) {
            const formData = new FormData()
            formData.append("name",name)
            formData.append("gender",gender)
            formData.append("age",age)
            formData.append("languages",language)
            formData.append("class_ids",class_id)
            formData.append("salary_min",'10,000')
            formData.append("salary_max",'1,00,000')

            const response = await fetch(url + "create-instructor",{
                method : 'POST',
                headers : {
                    "Authorization" : `Bearer ${user?.token}`
                },
                body : formData
            })

            if (response.ok == true){
                const data = await response.json()
                if (data?.status == 200){
                    Toast.success(data?.message)
                    setTimeout(() => {
                       router.back() 
                    }, 300);
                }else{
                    Toast.error(data?.message)
                }
            }
        } else {
            Toast.error("Please fill all details")
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
            <View style={styles.container}>
                <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
                <ImageBackground source={require('../../assets/images/above-banner.png')} style={styles.BGImg}>
                    <View style={{ paddingTop: inset.top + 4, marginHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, paddingLeft: 0 }}>
                            <Ionicons name="arrow-back" size={22} color="white" />
                        </TouchableOpacity>
                        <Text style={{ marginTop: 26, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 12 }}>Instructor details</Text>
                        <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 12 }}>Get started by adding your first class details.</Text>
                    </View>
                </ImageBackground>

                <View style={{ flex: 1, }}>
                    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: 16, }}>
                            <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 26 }}>Instructor Name</Text>
                            <Input
                                variant="none"
                                size="lg"
                                isRequired
                                style={{ height: 42, marginTop: 12 }}
                            >
                                <InputField value={name} onChangeText={setName} placeholder="e.g. John Doe" style={{ color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontSize: 13, fontFamily: fonts.IntReg, paddingLeft: 16 }} />
                            </Input>

                            <HStack space="md" style={{ marginTop: 16 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16 }}>Gender</Text>
                                    <Select selectedValue={gender} onValueChange={(value) => setGender(value)} style={{ marginTop: 12, }}>
                                        <SelectTrigger style={{ justifyContent: 'space-between', borderRadius: 12, borderWidth: 1, borderColor: '#C6C9D2', height: 43 }} variant="outline" size="md">
                                            <SelectInput placeholder="Select Gender" fontFamily={fonts.IntReg} fontSize={13} style={{ color: '#666D80' }} />
                                            <AntDesign name="down" size={16} color="#C6C9D2" style={{ marginHorizontal: 12 }} />
                                        </SelectTrigger>
                                        <SelectPortal>
                                            <SelectBackdrop />
                                            <SelectContent>
                                                <SelectDragIndicatorWrapper>
                                                    <SelectDragIndicator />
                                                </SelectDragIndicatorWrapper>
                                                {[
                                                    'Male',
                                                    'Female',
                                                ].map(item => (
                                                    <SelectItem key={item} label={item} value={item} />
                                                ))}
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16 }}>Age</Text>
                                    <Input
                                        variant="none"
                                        size="lg"
                                        isRequired
                                        style={{ height: 43, marginTop: 12 }}
                                    >
                                        <InputField value={age} onChangeText={setAge} placeholder="e.g. 45" style={{ color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontSize: 13, fontFamily: fonts.IntReg, paddingLeft: 16 }} />
                                    </Input>
                                </View>
                            </HStack>

                            <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Languages of instruction</Text>
                            <Select selectionMode="multiple" selectedValue={language} onValueChange={(value) => setLanguage(value)} style={{ marginTop: 10, }}>
                                <SelectTrigger style={{ justifyContent: 'space-between', borderRadius: 12, borderWidth: 1, borderColor: '#C6C9D2', height: 42 }} variant="outline" size="md">
                                    <SelectInput placeholder="Select Language" fontFamily={fonts.IntReg} fontSize={13} style={{ color: '#666D80' }} />
                                    <AntDesign name="down" size={16} color="#C6C9D2" style={{ marginHorizontal: 12 }} />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>
                                        <SelectDragIndicatorWrapper>
                                            <SelectDragIndicator />
                                        </SelectDragIndicatorWrapper>
                                        {[
                                            'English',
                                            'Hindi',
                                            'Tamil'
                                        ].map(day => (
                                            <SelectItem key={day} label={day} value={day} />
                                        ))}
                                    </SelectContent>
                                </SelectPortal>
                            </Select>

                        </View>
                    </ScrollView>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => addInstructor()} activeOpacity={.8} style={[styles.whiteBTN]}>
                            <Text style={styles.WhiteBTNText}>Add Instructor</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
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
    TimeSelectBtn: {
        borderColor: '#C6C9D2',
        borderWidth: 1,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10
    },
    TimeSelectText: {
        color: '#C6C9D2',
        fontFamily: fonts.IntSB,
        fontSize: 14,
    },
    ActionBtn: {
        backgroundColor: colors.primary,
        width: '100%',
        padding: 12,
        marginVertical: 16,
        borderRadius: 16,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    detail: {
        fontSize: 13,
        fontFamily: fonts.IntMed,
        color: '#666D80',
    },

    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#C6C9D2',
        marginHorizontal: 8,
    },
})

export default AddInstructors;