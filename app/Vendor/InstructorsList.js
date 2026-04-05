import { HStack } from '@/components/ui/hstack';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';
import { userContext } from '../../context/UserContext';
import { url } from '../../helpers';


const InstructorsList = () => {
    const inset = useSafeAreaInsets()
    const { class_id } = useLocalSearchParams()
    const [instructorsList, setInstructorsList] = useState([])
    const { user } = useContext(userContext)

    async function fetchInstructors() {
        const response = await fetch(url + "fetchClassWiseInstructor/" + class_id, {
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        })

        if (response.ok == true) {
            const data = await response.json()
            setInstructorsList(data?.list)
        }
    }

    useEffect(() => {
        fetchInstructors()
    }, [])



    return (
        <View style={{ flex: 1 }}>
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
                            <HStack style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 26 }}>
                                <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16 }}>Instructor</Text>
                                <TouchableOpacity onPress={() => router.push({
                                    pathname: 'Vendor/AddInstructors',
                                    params: {
                                        class_id: class_id,
                                        previous_data: JSON.stringify({})
                                    }
                                })} style={{ backgroundColor: '#16A34A', paddingHorizontal: 6, paddingBottom: 4, borderRadius: 4 }}>
                                    <Text style={{ fontFamily: fonts.IntBold, fontSize: 12, color: 'white' }}><Text style={{ fontSize: 18 }}>+ </Text> Add Instructor</Text>
                                </TouchableOpacity>
                            </HStack>

                            {instructorsList?.length > 0 ? instructorsList?.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => {
                                    router.push({
                                        pathname: 'Vendor/AddInstructors',
                                        params: {
                                            class_id: class_id,
                                            previous_data: JSON.stringify(item)
                                        }
                                    })
                                }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                                    <HStack alignItems="center" style={{ justifyContent: 'space-between', flex: 1, borderWidth: 1.5, borderColor: '#CDCECF', paddingVertical: 14, paddingHorizontal: 16, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, borderRightWidth: 0 }}>
                                        <HStack alignItems="center">
                                            <Text style={{ color: '#666D80', fontFamily: fonts.IntMed, fontSize: 16 }}>{item?.name}</Text>
                                        </HStack>
                                        <View style={styles.row}>
                                            <Text style={styles.detail}>{item?.age}</Text>
                                            <View style={styles.dot} />
                                            <Text style={styles.detail}>{item?.gender}</Text>
                                        </View>
                                    </HStack>
                                    <View style={{ backgroundColor: colors.primary, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 6, borderBottomRightRadius: 6, }}>
                                        <Entypo name="chevron-thin-right" size={24} color="white" />
                                    </View>
                                </TouchableOpacity>
                            )) : <View style={styles.NoDataContainer}>
                                <View style={styles.iconCircle}>
                                    <Ionicons name="school-outline" size={60} color="#6366f1" />
                                    <View style={styles.badge}>
                                        <Ionicons name="search" size={16} color="white" />
                                    </View>
                                </View>

                                <Text style={styles.title}>No Instructors Found</Text>
                                <Text style={styles.subtitle}>We couldn't find any instructors.</Text>
                            </View>}

                        </View>
                    </ScrollView>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => router.push({
                            pathname: 'Vendor/ReceiveEnquiries',
                            params: {
                                class_id
                            }
                        })} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: inset.bottom }]}>
                            <Text style={styles.WhiteBTNText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
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

    NoDataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        backgroundColor: '#fff',
        marginTop: 60
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f5f7ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    badge: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        backgroundColor: '#6366f1',
        padding: 8,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
})

export default InstructorsList;