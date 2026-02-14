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
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';


const ListingClass1 = () => {
    const inset = useSafeAreaInsets()

    const [className, setClassName] = useState('')
    const [classCategory, setClassCategory] = useState('')
    const [description, setDescription] = useState('')
    const [startYear, setStartYear] = useState()

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
                        <InputField value={className} onChangetext={setClassName} placeholder="e.g. Bharatanatyam Dance Classes" style={{ color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontSize: 13, fontFamily: fonts.IntReg, paddingLeft: 16 }} />
                    </Input>

                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Class category</Text>
                    <Select style={{ marginTop: 12, }}>
                        <SelectTrigger style={{ justifyContent: 'space-between', borderRadius: 12, borderWidth: 1, borderColor: '#C6C9D2', height: 42 }} variant="outline" size="md">
                            <SelectInput placeholder="Select Category" fontFamily={fonts.IntReg} fontSize={13} />
                            <AntDesign name="down" size={16} color="#C6C9D2" style={{ marginHorizontal: 12 }} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                <SelectItem label="UX Research" value="ux" />
                                <SelectItem label="Web Development" value="web" />
                                <SelectItem
                                    label="Cross Platform Development Process"
                                    value="Cross Platform Development Process"
                                />
                                <SelectItem label="UI Designing" value="ui" isDisabled={true} />
                                <SelectItem label="Backend Development" value="backend" />
                            </SelectContent>
                        </SelectPortal>
                    </Select>

                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Class description </Text>
                    <Textarea
                        size="md"
                        isReadOnly={false}
                        isInvalid={false}
                        isDisabled={false}
                        style={{ width: '100%', borderWidth: 0, marginTop: 12 }}
                    >
                        <TextareaInput style={{ borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, fontSize: 13, borderColor: '#C6C9D2', }} placeholder="What will students learn? Mention skills, levels, and outcomes." />
                    </Textarea>

                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Started in</Text>
                    <Select style={{ marginTop: 12, }}>
                        <SelectTrigger style={{ justifyContent: 'space-between', borderRadius: 12, borderWidth: 1, borderColor: '#C6C9D2', height: 42 }} variant="outline" size="md">
                            <SelectInput placeholder="Select Year" fontFamily={fonts.IntReg} fontSize={13} />
                            <AntDesign name="down" size={16} color="#C6C9D2" style={{ marginHorizontal: 12 }} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                <SelectItem label="UX Research" value="ux" />
                                <SelectItem label="Web Development" value="web" />
                                <SelectItem
                                    label="Cross Platform Development Process"
                                    value="Cross Platform Development Process"
                                />
                                <SelectItem label="UI Designing" value="ui" isDisabled={true} />
                                <SelectItem label="Backend Development" value="backend" />
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => router.push('Vendor/ListingClass2')} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: inset.bottom }]}>
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