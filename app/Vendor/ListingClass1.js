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
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { colors, fonts } from '../../config/Config';
import { userContext } from '../../context/UserContext';
import { url } from '../../helpers';


const ListingClass1 = () => {
    const inset = useSafeAreaInsets()
    const {class_id,class_details} = useLocalSearchParams()
    const { user } = useContext(userContext)
    const [skills, setSkills] = useState([])

    const [className, setClassName] = useState('')
    const [classCategory, setClassCategory] = useState('')
    const [description, setDescription] = useState('')
    const [startYear, setStartYear] = useState()


    async function fetchCategories() {
        const response = await fetch(url + "fetch-categories?status=1", {
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        })

        if (response.ok == true) {
            const data = await response.json()
            if (data?.status == 200) {
                setSkills(data?.list)
            }
        }
    }

    useEffect(() => {
        fetchCategories()

        if (class_details){
            let class_data = JSON.parse(class_details)
            setClassName(class_data?.display_name)
            setClassCategory(class_data?.categories)
            setDescription(class_data?.description)
            setStartYear(class_data?.started_year)
        }
    }, [])

    async function submit() {
        const formData = new FormData()

        formData.append("display_name", className)
        formData.append("categories", classCategory)
        formData.append("description", description)
        formData.append("started_year", startYear)

        let api_url = url + "create-class"

        if (class_id){
            api_url = url + "edit-class/" + class_id
        }

        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${user?.token}`
            },
            body: formData
        })

        if (response.ok == true) {
            const data = await response.json()

            if (data.status == 200) {
                console.log(data)
                if (class_id){
                    Toast.success("Class edited successfully!")
                }else{
                    Toast.success("Class Created Successfully!")
                }
                setTimeout(() => {
                    router.push({
                        pathname : 'Vendor/ListingClass2',
                        params : {
                            class_id : data?.class_id
                        }
                    })
                }, 300);
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
                    <Text style={{ marginTop: 26, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 12 }}>Let’s List Your First Class</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 12 }}>Get started by adding your first class details.</Text>
                </View>
            </ImageBackground>

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ marginHorizontal: 16, }}>
                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 26 }}>Display name (Class name)</Text>
                    <Input
                        variant="none"
                        size="lg"
                        isRequired
                        style={{ height: 42, marginTop: 12 }}
                    >
                        <InputField value={className} onChangeText={setClassName} placeholder="e.g. Bharatanatyam Dance Classes" style={{ color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontSize: 13, fontFamily: fonts.IntReg, paddingLeft: 16 }} />
                    </Input>

                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Class category</Text>
                    <Select selectedValue={classCategory}
                        onValueChange={(value) => setClassCategory(value)} style={{ marginTop: 12, }}>
                        <SelectTrigger style={{ justifyContent: 'space-between', borderRadius: 12, borderWidth: 1, borderColor: '#C6C9D2', height: 42 }} variant="outline" size="md">
                            <SelectInput value={skills.filter(item => item?.id == classCategory)[0]?.name} placeholder="Select Category" fontFamily={fonts.IntReg} fontSize={13} style={{color : "#666D80"}} />
                            <AntDesign name="down" size={16} color="#C6C9D2" style={{ marginHorizontal: 12 }} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                {skills.length > 0 && skills.map(skill => (
                                    <SelectItem label={skill?.name} value={skill?.id} />
                                ))}


                            </SelectContent>
                        </SelectPortal>
                    </Select>

                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Class description </Text>
                    <Textarea
                        size="md"
                        isReadOnly={false}
                        isInvalid={false}
                        isDisabled={false}
                        style={{ width: '100%', borderWidth: 0, marginTop: 12,color : 'black' }}
                    >
                        <TextareaInput  value={description}
                            onChangeText={(text) => setDescription(text)} style={{ borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, fontSize: 13, borderColor: '#C6C9D2',color : '#17181C' }} placeholder="What will students learn? Mention skills, levels, and outcomes." />
                    </Textarea>

                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Started in</Text>

                    <Input
                        variant="none"
                        size="lg"
                        isRequired
                        style={{ height: 42, marginTop: 12 }}
                    >
                        <InputField keyboardType="number-pad"
                            value={startYear} onChangeText={setStartYear} placeholder="e.g. 1997" style={{ color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontSize: 13, fontFamily: fonts.IntReg, paddingLeft: 16 }} />
                    </Input>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        if (className && classCategory && description && startYear) {
                            submit()
                        } else {
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
    BTNtext: {
        fontFamily: fonts.IntSB,
        fontSize: 12,
        textAlign: 'center',
    },
    AccBTN: {
        flex: 1,
        backgroundColor: 'red',
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: 'center',
    }
})

export default ListingClass1;