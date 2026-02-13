import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';


const SelectCourses = () => {
    const inset = useSafeAreaInsets()
    const [selected, setSelected] = useState([]);
    const { accountType, name } = useLocalSearchParams()

    const SKILLS = [
        { id: '1', title: 'Art' },
        { id: '2', title: 'Coding' },
        { id: '3', title: 'Robotics' },
        { id: '4', title: 'Dance' },
        { id: '5', title: 'Music' },
        { id: '6', title: 'Fitness' },
        { id: '7', title: 'Academic' },
        { id: '8', title: 'Yoga' },
        { id: '9', title: 'Writing' },
        { id: '10', title: 'fitting' },
        { id: '12', title: 'sitting' },
        { id: '13', title: 'hitting' },
        { id: '14', title: 'bitting' },
    ];

    const toggleSkill = (item) => {
        setSelected((prev) =>
            prev.filter(selector => selector?.id == item?.id).length > 0
                ? prev.filter((i) => i.id !== item?.id)
                : [...prev, item]
        );
        console.log(selected)
    };

    const renderItem = ({ item }) => {
        const isSelected = selected.filter(prev => prev?.id == item.id).length > 0 ? true : false

        return (
            <TouchableOpacity
                style={[
                    styles.skillItem,
                    isSelected && styles.skillSelected,
                ]}
                onPress={() => toggleSkill(item)}
            >
                <Image style={[styles.icon, { tintColor: 'white' }]} source={require('../../assets/images/code-icon.png')} />
                <Text
                    style={[
                        styles.skillText,
                        isSelected && styles.skillTextSelected,
                    ]}
                >
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

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
                    data={SKILLS}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontFamily: fonts.IntMed, fontSize: 11, marginTop: 6 }}>Select at least 3 categories to continue</Text>
                    <TouchableOpacity onPress={() => router.push({
                        pathname: 'Vendor/ReviewDetails',
                        params: {
                            accountType,
                            name,
                            skill: JSON.stringify(selected)
                        }
                    })} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: inset.bottom }]}>
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