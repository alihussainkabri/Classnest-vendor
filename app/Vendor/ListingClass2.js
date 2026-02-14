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
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';


const ListingClass2 = () => {
    const inset = useSafeAreaInsets()

    const [classMode, setClassMode] = useState('Online')
    const [city, setCity] = useState()


    const [region, setRegion] = useState(null);
    const [marker, setMarker] = useState(null);
    const [address, setAddress] = useState('');
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

    async function useCurrentLocation() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const current = await Location.getCurrentPositionAsync({});
        const coords = {
            latitude: current.coords.latitude,
            longitude: current.coords.longitude,
        };

        setRegion({
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });

        setMarker(coords);
        fetchAddress(coords);
    };

    async function fetchAddress({ latitude, longitude }) {
        const geo = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (geo.length > 0) {
            const p = geo[0];
            setAddress(
                `${p.name || ''}, ${p.city || ''}, ${p.region || ''}`
            );
        }
    };

    const onMapPress = async (e) => {
        const coords = e.nativeEvent.coordinate;
        setMarker(coords);
        fetchAddress(coords);
    };

    const onConfirm = () => {
        router.replace({
            pathname: '../PreviousScreen',
            params: {
                location: JSON.stringify({
                    ...marker,
                    address,
                }),
            },
        });
    };

    // if (!region) return <Text>Loading map...</Text>;

    useEffect(() => {
        useCurrentLocation();
    }, []);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
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

                <View style={{ flex: 1, }}>
                    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
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
                            <Select style={{ marginTop: 12, }}>
                                <SelectTrigger style={{ justifyContent: 'space-between', borderRadius: 12, borderWidth: 1, borderColor: '#C6C9D2', height: 42 }} variant="outline" size="md">
                                    <SelectInput placeholder="Area, street and landmark" style={{ color: 'black', fontSize: 13 }} fontFamily={fonts.IntReg} fontSize={13} />
                                    <FontAwesome6 name="location-dot" size={16} color="black" style={{ marginHorizontal: 12 }} />
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

                            {/* <MapView
                                style={styles.map}
                                region={region}
                                onPress={onMapPress}
                            >
                                {marker && <Marker coordinate={marker} />}
                            </MapView>

                            <TouchableOpacity style={styles.locateBtn} onPress={useCurrentLocation}>
                                <Text style={styles.locateText}>Use My Current Location</Text>
                            </TouchableOpacity>

                            <View style={styles.footer}>
                                <Text style={styles.address}>{address}</Text>

                                <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
                                    <Text style={styles.confirmText}>Confirm Location</Text>
                                </TouchableOpacity>
                            </View> */}

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

                            <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 16 }}>Country</Text>
                            <Select style={{ marginTop: 12, }}>
                                <SelectTrigger style={{ justifyContent: 'space-between', borderRadius: 12, borderWidth: 1, borderColor: '#C6C9D2', height: 42 }} variant="outline" size="md">
                                    <SelectInput style={{ color: 'black', fontSize: 13 }} placeholder="Select Country" fontFamily={fonts.IntReg} fontSize={13} />
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

                            <HStack space="md" style={{ marginTop: 16 }}>
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

                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16 }}>State</Text>
                                    <Input
                                        variant="none"
                                        size="lg"
                                        isRequired
                                        style={{ height: 42, marginTop: 12 }}
                                    >
                                        <InputField value={city} onChangeText={setCity} placeholder="Enter State" style={{ color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontSize: 13, fontFamily: fonts.IntReg, paddingLeft: 16 }} />
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
                    </ScrollView>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => router.push('Vendor/ListingClass3')} activeOpacity={.8} style={[styles.whiteBTN]}>
                            <Text style={styles.WhiteBTNText}>Continue to class setup</Text>
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