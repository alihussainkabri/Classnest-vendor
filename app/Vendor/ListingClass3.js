import { HStack } from '@/components/ui/hstack';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';


const ListingClass3 = () => {
    const inset = useSafeAreaInsets()

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
                        <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 12 }}>Confirm your information before listing your classes.</Text>
                    </View>
                </ImageBackground>

                <View style={{ flex: 1, }}>
                    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: 16, }}>
                            <HStack style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 26 }}>
                                <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16 }}>Batches</Text>
                                <TouchableOpacity style={{ backgroundColor: '#16A34A', paddingHorizontal: 6, paddingBottom: 4, borderRadius: 4 }}>
                                    <Text style={{ fontFamily: fonts.IntBold, fontSize: 12, color: 'white' }}><Text style={{ fontSize: 18 }}>+ </Text> Add Batch</Text>
                                </TouchableOpacity>
                            </HStack>

                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                                <HStack alignItems="center" style={{ justifyContent: 'space-between', flex: 1, borderWidth: 1.5, borderColor: '#CDCECF', paddingVertical: 14, paddingHorizontal: 16, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, borderRightWidth: 0 }}>
                                    <HStack alignItems="center">
                                        <Ionicons name="calendar-clear-sharp" size={32} color="#9DA2A6" />
                                        <Text style={{ color: '#666D80', fontFamily: fonts.IntMed, fontSize: 16, marginLeft: 12 }}>Monday</Text>
                                    </HStack>
                                    <Text style={{ color: '#666D80', fontFamily: fonts.IntMed, fontSize: 14 }}>10:30 AM - 11:30 AM</Text>
                                </HStack>
                                <View style={{ backgroundColor: colors.primary, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 6, borderBottomRightRadius: 6, }}>
                                    <Entypo name="chevron-thin-right" size={24} color="white" />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={.8} style={[styles.whiteBTN]}>
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
})

export default ListingClass3;