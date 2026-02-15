import {
    Modal,
    ModalBackdrop,
    ModalContent
} from '@/components/ui/modal';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';

const ProfileStatus = ({ navigation }) => {
    const [value, setValue] = useState('')
    const [countryCode, setCountryCode] = useState('US');
    const [enquiryType, setEnquiryType] = useState('');
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = React.useState(false);

    const phoneInputRef = useRef(null);
    const inset = useSafeAreaInsets()

    const requestPermissions = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!cameraPermission.granted || !mediaPermission.granted) {
            Alert.alert("Permission required");
            return false;
        }
        return true;
    };

    const pickFromGallery = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            setShowModal(false)
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setImage(result.assets[0].uri);

            setShowModal(false)
        }
    };

    const openCamera = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            setShowModal(false)
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setImage(result.assets[0].uri);

            setShowModal(false)
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
            <ImageBackground source={require('../../assets/images/above-banner.png')} style={styles.BGImg}>
                <View style={{ paddingTop: inset.top + 4, marginHorizontal: 16 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, paddingLeft: 0 }}>
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>
                    <Text style={{ marginTop: 20, fontFamily: fonts.IntBold, color: 'white', fontSize: 28, marginBottom: 8 }}>Complete your profile</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 13 }}>You are two steps away from completing your profile.</Text>
                </View>
            </ImageBackground>

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: 16, }}>
                        <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 18, marginTop: 30 }}>Upload Images <Text style={{ fontFamily: fonts.IntMed, fontSize: 12 }}>(max : 10)</Text></Text>

                        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.uploadImgCard}>
                            <View style={{ flexDirection: 'row', borderRadius: 8, borderWidth: 2, borderColor: '#DFDFDF', alignItems: 'center', marginBottom: 14, paddingVertical: 8, paddingHorizontal: 16 }}>
                                <Feather name="upload" size={24} color="#002858" />
                                <Text style={{ fontFamily: fonts.IntSB, color: '#17181C', fontSize: 16, marginLeft: 8 }}>Upload</Text>
                            </View>

                            <Text style={{ fontFamily: fonts.IntReg, fontSize: 13, color: '#17181C', marginBottom: 6 }}>Tap to upload images</Text>
                            <Text style={{ fontFamily: fonts.IntMed, fontSize: 11, color: '#9DA2A6' }}>JPG, PNG or WEBP · PDF .  Max 10 images · 20 MB each</Text>
                        </TouchableOpacity>

                        {image && (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                                <View style={{ width: '22%' }}>
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.imgs}
                                    />
                                    <TouchableOpacity style={styles.closeBTN}>
                                        <Ionicons name="close-circle" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>

                <Modal isOpen={showModal} onClose={() => { setShowModal(false) }} size="full">
                    <ModalBackdrop />
                    <ModalContent className="mt-auto w-[80%] self-center rounded-3xl bg-white border-0" style={{ marginBottom: Dimensions.get('window').height / 100 * 14, height: 126 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 36 }}>
                            <TouchableOpacity onPress={pickFromGallery}>
                                <FontAwesome name="folder-open" style={styles.Modalicon} />
                                <Text style={styles.modalTXT}>File</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={openCamera}>
                                <Entypo name="camera" style={styles.Modalicon} />
                                <Text style={styles.modalTXT}>Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalContent>
                </Modal>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{fontFamily: fonts.IntMed, color: '#9DA2A6', fontSize: 10, marginTop: 14}}>Add at least one image to continue</Text>

                    <TouchableOpacity onPress={() => router.push('Vendor/ReceiveEnquiries')} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: inset.bottom }]}>
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
        height: Dimensions.get('window').height / 100 * 26,
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
        marginTop: 12,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
    },
    WhiteBTNText: {
        color: 'white',
        fontFamily: fonts.IntBold,
        fontSize: 16,
        textAlign: 'center',
    },
    Modalicon: {
        fontSize: 40,
        color: "white",
        backgroundColor: colors.primary,
        alignSelf: 'flex-start',
        padding: 12,
        borderRadius: 16
    },
    modalTXT: {
        fontFamily: fonts.IntMed,
        textAlign: 'center',
        fontSize: 16
    },
    uploadImgCard: {
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        borderWidth: 3,
        borderStyle: 'dashed',
        borderColor: '#E3E3E3',
        alignItems: 'center',
        paddingVertical: 22,
        marginTop: 16,
        marginBottom: 10
    },
    imgs: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        marginTop: 10,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    closeBTN: {
        position: 'absolute',
        top: 0,
        right: -8,
    }
})

export default ProfileStatus;