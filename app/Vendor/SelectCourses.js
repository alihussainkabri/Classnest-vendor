import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { colors, fonts } from '../../config/Config';
import { userContext } from '../../context/UserContext';
import { node_url, url } from '../../helpers';


const SelectCourses = () => {
    const inset = useSafeAreaInsets()
    const [selected, setSelected] = useState([]);
    const { user,setUser } = useContext(userContext)
    const [skills, setSkills] = useState([])

    const toggleSkill = (item) => {
        setSelected((prev) => prev.includes(item?.id)
                ? prev.filter((i) => i.id !== item?.id)
                : [...prev, item?.id]
        );
    };

    useEffect(() => {
        if (user?.categories){
            setSelected(JSON.parse(user?.categories))
        }
    } , [user])

    const renderItem = ({ item }) => {
        const isSelected = selected.includes(item.id) ? true : false

        return (
            <TouchableOpacity
                style={[
                    styles.skillItem,
                    isSelected && styles.skillSelected,
                ]}
                onPress={() => toggleSkill(item)}
            >
                <Image style={[styles.icon, { tintColor: 'black' }]} source={{ uri: `${node_url}${item?.image}` }} />
                <Text
                    style={[
                        styles.skillText,
                        isSelected && styles.skillTextSelected,
                    ]}
                >
                    {item?.name}
                </Text>
            </TouchableOpacity>
        );
    };

    async function fetchCategories() {
        const response = await fetch(url + "fetch-categories?status=1", {
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        })

        if (response.ok == true) {
            const data = await response.json()
            if (data?.status == 200) {
                setSkills(data?.list)
            }
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    async function submit() {
        const formData = new FormData()

        formData.append("categories_id", JSON.stringify(selected))

        const response = await fetch(url + "vendor-onboarding/add-categories", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${user?.token}`
            },
            body: formData
        })

        if (response.ok == true) {
            const data = await response.json()

            if (data.status == 200) {
                setUser(data?.user_data)
                AsyncStorage.setItem("classnest_vendor", JSON.stringify(data?.user_data))
                Toast.success(data?.message)

                
                    setTimeout(() => {
                        router.push('Vendor/DetailSuccess')
                    }, 200);
                



            } else {
                Toast.error(data?.message)
            }
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
                    <Text style={{ marginTop: 26, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 12 }}>What do you teach?</Text>
                    <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 12 }}>Select the categories you offer classes in.</Text>
                </View>
            </ImageBackground>

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <FlatList
                    data={skills}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontFamily: fonts.IntMed, fontSize: 11, marginTop: 6 }}>Select at least 3 categories to continue</Text>
                    <TouchableOpacity onPress={() => {
                        
                        if (selected.length > 2) {
                            submit()
                        } else {
                            Toast.error("Please select atleast 3 categories")
                        }
                    }} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: inset.bottom }]}>
                        <Text style={styles.WhiteBTNText}>Next</Text>
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
        marginTop: 8,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
    },
    WhiteBTNText: {
        color: 'white',
        fontFamily: fonts.IntBold,
        fontSize: 16,
        textAlign: 'center',
    },
    listContent: {
        padding: 16,
        paddingBottom: 20,
    },

    skillItem: {
        flex: 1 / 3,
        margin: 4,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,

        // Android shadow
        elevation: 3,
    },

    skillSelected: {
        backgroundColor: '#E91E63',
    },

    icon: {
        width: 30,
        height: 40,
        resizeMode: 'contain'
    },

    skillText: {
        color: '#888',
        fontWeight: '600',
    },

    skillTextSelected: {
        color: '#fff',
    },
})

export default SelectCourses;