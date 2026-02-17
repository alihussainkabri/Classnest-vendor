import { HStack } from '@/components/ui/hstack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../../config/Config';

const Awards = () => {

    //   const [list, setList] = useState([])
    //   const { user } = useContext(userContext)

    //   async function fetchClasses() {
    //     const response = await fetch(url + "fetch-vendor-classes", {
    //       headers: {
    //         "Authorization": `Bearer ${user?.token}`
    //       }
    //     })

    //     if (response.ok == true) {
    //       const data = await response.json()

    //       if (data?.status == 200) {
    //         setList(data?.list)
    //       } else {
    //         Toast.error(data?.message)
    //       }
    //     }
    //   }

    //   useEffect(() => {
    //     fetchClasses()
    //   }, [])


    const testArr = [
        { dark: "Award", light: "tetst a wd  a wd awd adasdawda wd sd  adwad  asdasd k wadj a sdn  fqjga svna v av va fvad v a dvan va va va sf qavjd s,jzvajhv jh vh`sdhfv " },
        { dark: "Award 1", light: "tetst a wd  a wd awd adasdawda wd sd  adwad  asdasd k wadj a sdn  fqjga svna v av va fvad v a dvan va va va sf qavjd s,jzvajhv jh vh`sdhfv " },
        { dark: "Award 2", light: "tetst a wd  a wd awd adasdawda wd sd  adwad  asdasd k wadj a sdn  fqjga svna v av va fvad v a dvan va va va sf qavjd s,jzvajhv jh vh`sdhfv " },
    ]
    const inset = useSafeAreaInsets()
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
            <ImageBackground source={require('../../../assets/images/above-banner.png')} style={styles.BGImg}>
                <HStack style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: inset.top + 12, marginHorizontal: 16 }}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, paddingLeft: 0 }}>
                            <Ionicons name="arrow-back" size={22} color="white" />
                        </TouchableOpacity>
                        <Text style={{ marginTop: 3, marginLeft: 4, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 3 }}>Awards</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={require('../../../assets/images/user-icon.png')} style={{ height: 45, width: 45, borderRadius: 100 }} />
                    </TouchableOpacity>
                </HStack>
            </ImageBackground>

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#F6F7FB', paddingBottom: 16 }}>
                    <View style={{ marginHorizontal: 16, paddingTop: 28 }}>
                        {testArr?.length > 0 && testArr?.map((item, index) => (
                            <TouchableOpacity key={index}
                            // onPress={() => {
                            //     router.push({
                            //         pathname: 'Classes/ClassDetails',
                            //         params: {
                            //             class_id: item?.id
                            //         }
                            //     })
                            // }}
                            >
                                <View style={{ backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 16, marginBottom: 12 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1, marginRight: 8 }}>
                                            <Text style={{ fontFamily: fonts.IntBold, fontSize: 18, flexShrink: 1, color: '#002858' }} numberOfLines={2} ellipsizeMode="tail">{item?.dark}</Text>
                                            <Text style={{ fontFamily: fonts.IntSB, fontSize: 12, flexShrink: 1, color: '#002858' }} numberOfLines={2} ellipsizeMode="tail">{item?.light}</Text>
                                        </View>
                                        <Image source={require('../../../assets/images/rounded.png')} style={{ width: 55, height: 55, borderRadius: 4, resizeMode: 'cover' }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
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
        height: Dimensions.get('window').height / 100 * 14,
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

export default Awards;