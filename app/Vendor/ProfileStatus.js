import { HStack } from '@/components/ui/hstack';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';

const ProfileStatus = ({ navigation }) => {
    const params_data = useLocalSearchParams()
    const [list, setList] = useState([])

    useEffect(() => {
        console.log(params_data)
        if (params_data?.list) {
            setList(JSON.parse(params_data?.list))
        }
    }, [])

    const inset = useSafeAreaInsets()

    function handleRedirection(item){
        if (item?.key == 'class'){
            router.push({
                pathname : 'Vendor/ListingClass1',
                params : {
                    class_id : item?.id ?? ''
                }
            })
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
                    <Text style={{ marginTop: 20, fontFamily: fonts.IntBold, color: 'white', fontSize: 28, marginBottom: 8 }}>Complete your profile</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 13 }}>You are two steps away from completing your profile.</Text>
                </View>
            </ImageBackground>

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: 16, }}>
                        <HStack style={{ marginTop: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontFamily: fonts.IntMed, fontSize: 13 }}>Question</Text>
                                <Text style={{ fontFamily: fonts.IntBold, fontSize: 30 }}>
                                    {list?.filter(item => item?.result == 'passed').length}/{list?.length}
                                </Text>
                            </View>


                            <AnimatedCircularProgress
                                size={90}
                                width={6}
                                fill={params_data?.percentage}
                                tintColor={colors.primary}
                                backgroundColor="#E5E7EB"
                                rotation={0}
                                lineCap="round"
                            >
                                {() => (
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                            {params_data?.percentage}%
                                        </Text>
                                        <Text style={{ fontSize: 11 }}>Completed</Text>
                                    </View>
                                )}
                            </AnimatedCircularProgress>
                        </HStack>

                        {list?.length > 0 && list?.map((item, index) => (
                            <TouchableOpacity onPress={() => handleRedirection(item)} key={index}>
                                <View style={styles.QueCard}>
                                    {item?.result == 'passed' ? <Text style={styles.tickIcon}>✔</Text> : <MaterialCommunityIcons name="clock" size={30} color="#FFCF1F" />}

                                    <Text style={{ fontFamily: fonts.IntSB, fontSize: 16, marginLeft: 14 }}>{item?.title}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}

                    </View>
                </ScrollView>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontFamily: fonts.IntMed, color: '#9DA2A6', fontSize: 10, marginTop: 14 }}>Add at least one image to continue</Text>

                    <TouchableOpacity onPress={() => router.push('Vendor/UploadAwards')} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: inset.bottom }]}>
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
    QueCard: {
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EAECEE',
        marginTop: 14,
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    tickIcon: {
        backgroundColor: '#ECF8F0',
        color: '#16A34A',
        fontSize: 16,
        borderRadius: 100,
        paddingVertical: 4,
        paddingHorizontal: 8
    }
})

export default ProfileStatus;