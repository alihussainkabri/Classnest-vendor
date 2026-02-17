import { HStack } from '@/components/ui/hstack';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../../config/Config';
import { userContext } from '../../../context/UserContext';
import { node_url, url } from '../../../helpers';

const Certificates = () => {

      const [list, setList] = useState([])
      const { user } = useContext(userContext)

      async function fetchAwards() {
        const response = await fetch(url + "fetch-certificate", {
          headers: {
            "Authorization": `Bearer ${user?.token}`
          }
        })

        if (response.ok == true) {
          const data = await response.json()

          if (data?.status == 200) {
            setList(data?.list)
          } else {
            Toast.error(data?.message)
          }
        }
      }

      useEffect(() => {
        fetchAwards()
      }, [])

    const inset = useSafeAreaInsets()
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
            <ImageBackground source={require('../../../assets/images/above-banner.png')} style={styles.BGImg}>
                <HStack style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: inset.top + 12, marginHorizontal: 16 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, paddingLeft: 0 }}>
                            <Ionicons name="arrow-back" size={22} color="white" />
                        </TouchableOpacity>
                        <Text style={{ marginTop: 3, marginLeft: 4, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 3 }}>Certificates</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={require('../../../assets/images/user-icon.png')} style={{ height: 45, width: 45, borderRadius: 100 }} />
                    </TouchableOpacity>
                </HStack>
            </ImageBackground>

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#F6F7FB', paddingBottom: 16 }}>
                    <View style={{ marginHorizontal: 16, paddingTop: 28 }}>
                        {list?.length > 0 && list?.map((item, index) => (
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
                                <View style={{ backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 16, marginTop: 12 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1, marginRight: 8 }}>
                                            <Text style={{ fontFamily: fonts.IntBold, fontSize: 18, flexShrink: 1, color: '#002858' }} numberOfLines={2} ellipsizeMode="tail">{item?.title}</Text>
                                            <Text style={{ fontFamily: fonts.IntSB, fontSize: 12, flexShrink: 1, color: '#002858' }} numberOfLines={2} ellipsizeMode="tail">{item?.description}</Text>
                                        </View>
                                        <Image source={{uri : `${node_url}${item?.file}`}} style={{ width: 55, height: 55, borderRadius: 4, resizeMode: 'cover' }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <View style={{ backgroundColor: '#F6F7FB', marginRight: 16, paddingVertical: 8 }}>
                {/* <TouchableOpacity style={{ position: 'absolute', bottom: 12, right: 12 }}> */}
                <TouchableOpacity onPress={()=> router.push('Profile/UploadCertificate')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, alignSelf: 'flex-end', paddingHorizontal: 26, paddingVertical: 8, borderRadius: 8 }}>
                    <FontAwesome6 name="plus" size={24} color="white" />
                    <Text style={{color: 'white', fontFamily: fonts.IntMed, fontSize: 16, marginLeft: 8}}>Add Certificate</Text>
                </TouchableOpacity>
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

export default Certificates;