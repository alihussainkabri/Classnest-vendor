import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useEffect } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';
import { userContext } from '../../context/UserContext';


const ReviewDetails = () => {
    const inset = useSafeAreaInsets()
    const {user} = useContext(userContext)

    const { accountType, name, skill } = useLocalSearchParams()

    const BTNColors = [
        { dark: '#6834BA', light: '#EFE5FF' },
        { dark: '#EA1561', light: '#FFDCE9' },
        { dark: '#16A34A', light: '#DFFFEB' },
    ]

    useEffect(() => console.log('courses:', typeof skill), [])

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
            <ImageBackground source={require('../../assets/images/above-banner.png')} style={styles.BGImg}>
                <View style={{ paddingTop: inset.top + 4, marginHorizontal: 16 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, paddingLeft: 0 }}>
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>
                    <Text style={{ marginTop: 26, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 12 }}>Set up your provider profile</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 12 }}>Confirm your information before listing your classes.</Text>
                </View>
            </ImageBackground>

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ marginHorizontal: 16, }}>
                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 26 }}>{accountType == 'individual' ? 'Individual Tutor' : 'Institute / Business'} Name</Text>
                    <Input
                        variant="none"
                        size="lg"
                        isreadOnly
                        isDisabled
                        isRequired
                        style={{ height: 42, marginTop: 12 }}
                    >
                        <InputField value={user?.person_name} placeholder="e.g John Doe" style={{ backgroundColor: '#C6C9D2', color: '#666D80', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontFamily: fonts.IntReg, paddingLeft: 16 }} />
                    </Input>

                    <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 26 }}>Selected categories</Text>
                    <HStack space="md" style={{ marginTop: 12 }}>
                        {JSON.parse(skill)?.length > 0 && JSON.parse(skill)?.map((item, index) => (
                            <TouchableOpacity key={index} style={[styles.AccBTN, { backgroundColor: BTNColors[index].light }]}>
                                <Text style={[styles.BTNtext, { color: BTNColors[index].dark }]}>{item?.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </HStack>

                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => router.push({
                        pathname: 'Vendor/DetailSuccess'
                    })} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: inset.bottom }]}>
                        <Text style={styles.WhiteBTNText}>Continue to class setup</Text>
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

export default ReviewDetails;