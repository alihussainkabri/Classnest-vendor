import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { colors, fonts } from '../../config/Config';
import { userContext } from '../../context/UserContext';
import { url } from '../../helpers';

const ListingClass2 = () => {
    const inset = useSafeAreaInsets()
    const { user } = useContext(userContext)
    const { class_id, formatted } = useLocalSearchParams()
    const [classMode, setClassMode] = useState('Online')
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    useEffect(() => {
        if (formatted) {
            setCountry(JSON?.parse(formatted)?.country)
            setState(JSON?.parse(formatted)?.state)
            setCity(JSON?.parse(formatted)?.city)
            setAddress(JSON?.parse(formatted)?.fullAddress)
            setLatitude(JSON?.parse(formatted)?.latitude)
            setLongitude(JSON?.parse(formatted)?.longitude)
        }
    }, [formatted])

    async function fetchClassData() {
        const response = await fetch(url + "fetchClassDetails/" + class_id, {
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        })

        if (response.ok === true) {
            const data = await response.json()

            if (data?.status == 200) {
                console.log(data)
                let location_data = data?.details?.class_location ? JSON.parse(data?.details?.class_location) : {}

                setClassMode(data?.details?.mode_of_class)
                setCountry(location_data?.country)
                setState(location_data?.state)
                setCity(location_data?.city)
                setAddress(location_data?.address)
                setLatitude(location_data?.latitude)
                setLongitude(location_data?.longitude)
                setSelectedGroups(data?.details?.age_groups ? JSON?.parse(data?.details?.age_groups) : [])
            }

        }
    }

    useEffect(() => {
        fetchClassData()
    }, [])





    const [selectedGroups, setSelectedGroups] = useState([]);

    const AGE_GROUPS = [
        '3 - 5 Years',
        '6 - 8 Years',
        '9 - 12 Years',
        '13 - 16 Years',
        '17+ Years',
    ];

    function selectAgeGroups(item) {
        setSelectedGroups((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    async function submit() {
        const formData = new FormData()

        formData.append("mode_of_class", classMode)
        formData.append("class_location", JSON.stringify({
            latitude,
            longitude,
            city,
            state,
            country,
            address
        }))
        formData.append("age_groups", JSON.stringify(selectedGroups))

        const response = await fetch(url + `create-class-step2/${class_id}`, {
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
                Toast.success("Class Created Successfully!")
                setTimeout(() => {
                    router.push({
                        pathname: 'Vendor/ListingClass3',
                        params: {
                            class_id: class_id
                        }
                    })
                }, 300);
            } else {
                Toast.error(data?.message)
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
                <View style={{ flex: 1 }}>
                    <KeyboardAwareScrollView
                        keyboardDismissMode="on-drag"
                        enableOnAndroid
                        enableAutomaticScroll
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        extraScrollHeight={120}
                        contentContainerStyle={{
                            paddingBottom: 160,
                        }}
                    >
                        <ImageBackground source={require('../../assets/images/above-banner.png')} style={styles.BGImg}>
                            <View style={{ paddingTop: inset.top + 4, marginHorizontal: 16 }}>
                                <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, paddingLeft: 0 }}>
                                    <Ionicons name="arrow-back" size={22} color="white" />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 26, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 12 }}>Let’s List Your First Class</Text>
                                <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 12 }}>Get started by adding your first class details.</Text>
                            </View>
                        </ImageBackground>


                        <View style={{ marginHorizontal: 16, }}>
                            <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 26 }}>Mode of classes</Text>
                            <HStack space="md" style={{ marginTop: 12 }}>
                                <TouchableOpacity onPress={() => setClassMode('Online')} style={[styles.AccBTN, { backgroundColor: classMode == 'Online' ? colors.primary : "#F1F2F4" }]}>
                                    <Text style={[styles.BTNtext, { color: classMode == 'Online' ? 'white' : "#666D80" }]}>Online</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setClassMode('Offline')} style={[styles.AccBTN, { backgroundColor: classMode == 'Offline' ? colors.primary : "#F1F2F4" }]}>
                                    <Text style={[styles.BTNtext, { color: classMode == 'Offline' ? 'white' : "#666D80" }]}>Offline</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setClassMode('Hybrid')} style={[styles.AccBTN, { backgroundColor: classMode == 'Hybrid' ? colors.primary : "#F1F2F4" }]}>
                                    <Text style={[styles.BTNtext, { color: classMode == 'Hybrid' ? 'white' : "#666D80" }]}>Hybrid</Text>
                                </TouchableOpacity>
                            </HStack>

                            <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Class Location</Text>
                            <Input
                                variant="none"
                                size="lg"
                                isRequired
                                style={{ height: 42, marginTop: 12 }}
                            >
                                <InputField value={address} onChangeText={setAddress} placeholder="Full Address" style={{ color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontFamily: fonts.IntReg, paddingLeft: 16 }} />

                                <InputSlot pr={12}>
                                    <TouchableOpacity onPress={() => {
                                        router.push({
                                            pathname: 'Maps/LocationPickerScreen',
                                            params: {
                                                redirect_screen: "Vendor/ListingClass2",
                                                class_id: class_id
                                            }
                                        })
                                    }} style={{ backgroundColor: '#F1F2F4', borderColor: '#C6C9D2', borderRadius: 12, justifyContent: 'center', height: 42, marginLeft: 4, paddingHorizontal: 8 }}>
                                        <Ionicons name="map" size={20} color="#666D80" />
                                    </TouchableOpacity>
                                </InputSlot>
                            </Input>

                            <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Country</Text>
                            <Input
                                variant="none"
                                size="lg"
                                isRequired
                                style={{ height: 42, marginTop: 12 }}
                            >
                                <InputField value={country} placeholder="Country" style={{ color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontFamily: fonts.IntReg, paddingLeft: 16 }} />
                            </Input>

                            <HStack space="md" style={{ marginTop: 16 }}>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16 }}>State</Text>
                                    <Input
                                        variant="none"
                                        size="lg"
                                        isRequired
                                        style={{ height: 42, marginTop: 12 }}
                                    >
                                        <InputField value={state} onChangeText={setState} placeholder="Enter State" style={{ color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontSize: 13, fontFamily: fonts.IntReg, paddingLeft: 16 }} />
                                    </Input>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16 }}>City</Text>
                                    <Input
                                        variant="none"
                                        size="lg"
                                        isRequired
                                        style={{ height: 42, marginTop: 12 }}
                                    >
                                        <InputField value={city} onChangeText={setCity} placeholder="Enter City" style={{ color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontSize: 13, fontFamily: fonts.IntReg, paddingLeft: 16 }} />
                                    </Input>
                                </View>
                            </HStack>

                            <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Select Age Groups</Text>
                            <HStack space="md" style={{ marginTop: 12, flexWrap: 'wrap' }}>
                                {AGE_GROUPS?.map((item, index) => {
                                    const isSelected = selectedGroups.includes(item);

                                    return (
                                        <TouchableOpacity key={index} onPress={() => selectAgeGroups(item)} style={[styles.pill, { backgroundColor: isSelected ? colors.primary : '#F1F2F4' }]}>
                                            <Text style={[styles.BTNtext, { color: isSelected ? 'white' : '#666D80' }]}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                })}

                                {/* <TouchableOpacity onPress={() => setClassMode('Online')} style={[styles.ageBTN, { backgroundColor: classMode == 'Online' ? colors.primary : "#F1F2F4" }]}>
                                    <Text style={[styles.BTNtext, { color: classMode == 'Online' ? 'white' : "#666D80" }]}>Online</Text>
                                </TouchableOpacity> */}
                            </HStack>
                        </View>
                    </KeyboardAwareScrollView>

                    <View style={{
                        alignItems: 'center', position: "absolute",
                        bottom: 0,
                        width: "100%",
                        backgroundColor: "#fff", paddingBottom: inset.bottom
                    }}>
                        <TouchableOpacity onPress={() => {
                            if (classMode && address && state && city && country && selectedGroups.length > 0) {
                                submit()
                            } else {
                                Toast.error("Please fill all details")
                            }
                        }} activeOpacity={.8} style={[styles.whiteBTN]}>
                            <Text style={styles.WhiteBTNText}>Continue to class setup</Text>
                        </TouchableOpacity>
                    </View>
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
    },
    pill: {
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 30,
    },
})

export default ListingClass2;