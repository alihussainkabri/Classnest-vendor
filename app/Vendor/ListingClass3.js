import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent
} from '@/components/ui/actionsheet';
import { HStack } from '@/components/ui/hstack';
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
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { format, isAfter } from 'date-fns';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { colors, fonts } from '../../config/Config';
import { userContext } from '../../context/UserContext';
import { url } from '../../helpers';


const ListingClass3 = () => {
    const inset = useSafeAreaInsets()
    const { user } = useContext(userContext)
    const { class_id } = useLocalSearchParams()
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [pickerType, setPickerType] = useState(null);
    const [visible, setVisible] = useState(false);
    const [showActionsheet, setShowActionsheet] = useState(false);
    const [editBatchID,setEditBatchID] = useState("")
    const [selectedDay, setSelectedDay] = useState('');
    const [totalBatches, setTotalBatches] = useState([])

    const handleClose = () => {
        setShowActionsheet(false)
    setEditBatchID("")
    };

    const openPicker = (type) => {
        setPickerType(type);
        setVisible(true);
    };

    const onConfirm = (date) => {
        setVisible(false);

        if (pickerType === 'start') {
            setStartTime(date);

            // Reset end time if invalid
            if (endTime && !isAfter(endTime, date)) {
                setEndTime(null);
            }
        }

        if (pickerType === 'end') {
            if (!startTime) {
                Alert.alert('Select start time first');
                setVisible(false);
                return;
            }

            if (!isAfter(date, startTime)) {
                Alert.alert('End time must be after start time');
                setVisible(false);
                return;
            }

            setEndTime(date);
            setPickerType(null);
            // console.log('start', format(startTime, 'hh:mm a'))
            // console.log('end', format(endTime, 'hh:mm a'))
            console.log('selected day: ', selectedDay)
        }
    };

    // function updateBatches() {
    //     if (selectedDay, startTime, endTime) {
    //         setTotalBatches((prev) =>
    //             prev.includes(item)
    //                 ? prev.filter((i) => i !== item)
    //                 : [...prev, item]
    //         );
    //     }
    // }

    async function fetchBatches() {
        const response = await fetch(url + "fetchClassWiseBatch/" + class_id, {
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        })

        if (response.ok == true) {
            const data = await response.json()
            console.log(data)
            setTotalBatches(data?.list)
        }
    }

    useEffect(() => {
        fetchBatches()
    }, [])

    useEffect(() => {
        if (editBatchID?.id){
            setSelectedDay(editBatchID?.day)
            setStartTime(new Date(editBatchID?.start_time))
            setEndTime(new Date(editBatchID?.end_time))
        }
    },[editBatchID])

    async function create() {
        const formData = new FormData()
        formData.append("day", selectedDay)
        formData.append("start_time", startTime?.toString())
        formData.append("end_time", endTime?.toString())

        const response = await fetch(url + "create-batch/" + class_id, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${user?.token}`
            },
            body: formData
        })

        if (response.ok == true) {
            const data = await response.json()
            console.log(data)

            if (data?.status == 200) {
                Toast.success("Batch created successfully")
                fetchBatches()
                handleClose()
            } else {
                Toast.error(data?.message)
            }

        }
    }

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
                            <HStack style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 26 }}>
                                <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16 }}>Batches</Text>
                                <TouchableOpacity onPress={() => setShowActionsheet(true)} style={{ backgroundColor: '#16A34A', paddingHorizontal: 6, paddingBottom: 4, borderRadius: 4 }}>
                                    <Text style={{ fontFamily: fonts.IntBold, fontSize: 12, color: 'white' }}><Text style={{ fontSize: 18 }}>+ </Text> Add Batch</Text>
                                </TouchableOpacity>
                            </HStack>

                            {totalBatches.length > 0 && totalBatches?.map((item, index) => (
                                <TouchableOpacity onPress={() => {
                                    setTimeout(() => {
                                       setShowActionsheet(true) 
                                    }, 500);
                                    setEditBatchID(item)
                                }} key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                                    <HStack alignItems="center" style={{ justifyContent: 'space-between', flex: 1, borderWidth: 1.5, borderColor: '#CDCECF', paddingVertical: 14, paddingHorizontal: 16, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, borderRightWidth: 0 }}>
                                        <HStack alignItems="center">
                                            <Ionicons name="calendar-clear-sharp" size={32} color="#9DA2A6" />
                                            <Text style={{ color: '#666D80', fontFamily: fonts.IntMed, fontSize: 16, marginLeft: 12 }}>{item?.day}</Text>
                                        </HStack>
                                        <Text style={{ color: '#666D80', textTransform : 'uppercase',fontFamily: fonts.IntMed, fontSize: 14 }}>{new Date(item?.start_time).toLocaleTimeString([], {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })} - {new Date(item?.end_time).toLocaleTimeString([], {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}</Text>
                                    </HStack>
                                    <View style={{ backgroundColor: colors.primary, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 6, borderBottomRightRadius: 6, }}>
                                        <Entypo name="chevron-thin-right" size={24} color="white" />
                                    </View>
                                </TouchableOpacity>
                            ))}




                        </View>
                    </ScrollView>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => router.push({
                            pathname : 'Vendor/InstructorsList',
                            params : {
                                class_id
                            }
                        })} activeOpacity={.8} style={[styles.whiteBTN]}>
                            <Text style={styles.WhiteBTNText}>Continue</Text>
                        </TouchableOpacity>
                    </View>



                    {/* batch creation start here */}
                    <Actionsheet
                        isOpen={showActionsheet}
                        onClose={handleClose}
                    >
                        <ActionsheetBackdrop />
                        <ActionsheetContent style={{ backgroundColor: 'white' }}>
                            {/* <ActionsheetDragIndicatorWrapper>
                                        <ActionsheetDragIndicator />
                                    </ActionsheetDragIndicatorWrapper> */}
                            <Text style={{ fontFamily: fonts.IntSB, fontSize: 16, marginTop: 12, }}>Batch</Text>
                            <HStack style={{ justifyContent: 'space-between', width: '100%', marginTop: -18 }}>
                                <TouchableOpacity>
                                    {editBatchID?.id && <Text style={{ color: '#FF0004', fontFamily: fonts.IntMed, fontSize: 11 }}>Delete</Text>}
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleClose()}>
                                    <Text style={{ color: '#9DA2A6', fontFamily: fonts.IntMed, fontSize: 11 }}>Cancel</Text>
                                </TouchableOpacity>
                            </HStack>

                            <View style={{ width: '100%' }}>
                                <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 30 }}>Day</Text>
                                <Select selectedValue={selectedDay} onValueChange={(value) => setSelectedDay(value)} style={{ marginTop: 10, }}>
                                    <SelectTrigger style={{ justifyContent: 'space-between', borderRadius: 12, borderWidth: 1, borderColor: '#C6C9D2', height: 42 }} variant="outline" size="md">
                                        <SelectInput placeholder="Select Day" fontFamily={fonts.IntSB} fontSize={13} style={{ color: '#666D80' }} />
                                        <AntDesign name="down" size={16} color="#C6C9D2" style={{ marginHorizontal: 12 }} />
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectBackdrop />
                                        <SelectContent>
                                            <SelectDragIndicatorWrapper>
                                                <SelectDragIndicator />
                                            </SelectDragIndicatorWrapper>
                                            {[
                                                'Monday',
                                                'Tuesday',
                                                'Wednesday',
                                                'Thursday',
                                                'Friday',
                                                'Saturday',
                                                'Sunday',
                                            ].map(day => (
                                                <SelectItem key={day} label={day} value={day} />
                                            ))}
                                        </SelectContent>
                                    </SelectPortal>
                                </Select>

                                <HStack space="md" style={{ marginTop: 16 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16 }}>Start Time</Text>
                                        <TouchableOpacity onPress={() => openPicker('start')} style={styles.TimeSelectBtn}>
                                            <Text style={styles.TimeSelectText}>{startTime ? format(startTime, 'hh:mm a') : 'Select'}</Text>
                                            <MaterialCommunityIcons name="clock" size={22} color="#666D80" />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16 }}>End Time</Text>
                                        <TouchableOpacity onPress={() => openPicker('end')} style={styles.TimeSelectBtn}>
                                            <Text style={styles.TimeSelectText}>{endTime ? format(endTime, 'hh:mm a') : 'Select'}</Text>
                                            <MaterialCommunityIcons name="clock" size={22} color="#666D80" />
                                        </TouchableOpacity>
                                    </View>
                                </HStack>

                                <TouchableOpacity onPress={() => {
                                    if (selectedDay && startTime && endTime) {
                                        create()
                                    } else {
                                        Toast.error("Please fill all details")
                                    }
                                }} style={styles.ActionBtn}>
                                    <Text style={styles.WhiteBTNText}>Add</Text>
                                </TouchableOpacity>

                            </View>
                        </ActionsheetContent>
                    </Actionsheet>

                    <DateTimePickerModal
                        isVisible={visible}
                        mode="time"
                        onConfirm={onConfirm}
                        onCancel={() => setVisible(false)}
                    />
                    {/* batch creation end here */}
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
    TimeSelectBtn: {
        borderColor: '#C6C9D2',
        borderWidth: 1,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10
    },
    TimeSelectText: {
        color: '#C6C9D2',
        fontFamily: fonts.IntSB,
        fontSize: 14,
    },
    ActionBtn: {
        backgroundColor: colors.primary,
        width: '100%',
        padding: 12,
        marginVertical: 16,
        borderRadius: 16,
    },
})

export default ListingClass3;