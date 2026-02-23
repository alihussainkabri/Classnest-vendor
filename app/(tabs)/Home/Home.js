import { HStack } from '@/components/ui/hstack';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../../config/Config';

const Home = () => {

  const [greeting, setGreeting] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = React.useState(false);

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

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Morning")
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Afternoon")
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Evening")
    } else {
      setGreeting("Evening")
    }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
      <ImageBackground source={require('../../../assets/images/above-banner.png')} style={styles.BGImg}>
        <View style={{ paddingTop: inset.top + 24, marginHorizontal: 16 }}>
          <HStack style={{ justifyContent: 'space-between' }}>
            <View style={{ height: 40, width: 40, borderRadius: 100, backgroundColor: 'white' }}></View>
            <TouchableOpacity>
              <Image source={require('../../../assets/images/code-icon.png')} style={{ height: 40, width: 40, borderRadius: 100 }} />
            </TouchableOpacity>
          </HStack>
          <Text style={{ marginTop: 16, fontFamily: fonts.IntReg, color: 'white', fontSize: 12 }}>Good {greeting}  {greeting == 'Evening' ? <AntDesign name="moon" size={15} color="#666D80" /> : <Ionicons name="sunny" size={15} color="#FFE236" />} </Text>
          <Text style={{ marginTop: 3, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 3 }}>Ali Hussain Kabri</Text>
          <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 13 }}>Popular topic: Design, Programming, Finance</Text>
        </View>
      </ImageBackground>

      <View style={{ justifyContent: 'space-between' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 16, }}>
            <View style={{ backgroundColor: '#FFFAE0', borderRadius: 18, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 16, marginTop: 20 }}>
              <Image source={require('../../../assets/images/home-verify.png')} style={{ width: 40, height: 40, resizeMode: 'contain', marginRight: 18 }} />
              <View>
                <Text style={{ fontFamily: fonts.IntMed, fontSize: 16 }}>Profile is Under Verification</Text>
                <Text style={{ fontFamily: fonts.IntReg, fontSize: 10 }}>We’ll notify you once it’s approved (24–48 hrs)</Text>
              </View>
            </View>
          </View>

          <View style={[styles.row, { marginHorizontal: 16, marginTop: 20, flexWrap: 'wrap', gap: 8, justifyContent: 'space-between' }]}>
            <View style={[styles.row, styles.DBcard]}>
              <Feather name="users" size={16} color="white" style={{ backgroundColor: colors.primary, alignSelf: 'flex-start', padding: 6, borderRadius: 6 }} />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontFamily: fonts.IntReg, fontSize: 16 }}>Total Leads</Text>
                <View style={[styles.row, { alignItems: 'flex-end' }]}>
                  <Text style={{ fontFamily: fonts.IntBold, fontSize: 26 }}>56</Text>
                  <Text style={{ fontFamily: fonts.IntReg, fontSize: 10, paddingLeft: 8, paddingBottom: 6 }}>+20.90% <FontAwesome6 name="arrow-trend-up" size={12} color="black" /></Text>
                </View>
              </View>
            </View>
            
            <View style={[styles.row, styles.DBcard]}>
              <Feather name="users" size={16} color="white" style={{ backgroundColor: colors.primary, alignSelf: 'flex-start', padding: 6, borderRadius: 6 }} />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontFamily: fonts.IntReg, fontSize: 16 }}>Total Leads</Text>
                <View style={[styles.row, { alignItems: 'flex-end' }]}>
                  <Text style={{ fontFamily: fonts.IntBold, fontSize: 26 }}>56</Text>
                  <Text style={{ fontFamily: fonts.IntReg, fontSize: 10, paddingLeft: 8, paddingBottom: 6 }}>+20.90% <FontAwesome6 name="arrow-trend-up" size={12} color="black" /></Text>
                </View>
              </View>
            </View>

            <View style={[styles.row, styles.DBcard]}>
              <Feather name="users" size={16} color="white" style={{ backgroundColor: colors.primary, alignSelf: 'flex-start', padding: 6, borderRadius: 6 }} />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontFamily: fonts.IntReg, fontSize: 16 }}>Total Leads</Text>
                <View style={[styles.row, { alignItems: 'flex-end' }]}>
                  <Text style={{ fontFamily: fonts.IntBold, fontSize: 26 }}>56</Text>
                  <Text style={{ fontFamily: fonts.IntReg, fontSize: 10, paddingLeft: 8, paddingBottom: 6 }}>+20.90% <FontAwesome6 name="arrow-trend-up" size={12} color="black" /></Text>
                </View>
              </View>
            </View>

            <View style={[styles.row, styles.DBcard]}>
              <Feather name="users" size={16} color="white" style={{ backgroundColor: colors.primary, alignSelf: 'flex-start', padding: 6, borderRadius: 6 }} />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontFamily: fonts.IntReg, fontSize: 16 }}>Total Leads</Text>
                <View style={[styles.row, { alignItems: 'flex-end' }]}>
                  <Text style={{ fontFamily: fonts.IntBold, fontSize: 26 }}>56</Text>
                  <Text style={{ fontFamily: fonts.IntReg, fontSize: 10, paddingLeft: 8, paddingBottom: 6 }}>+20.90% <FontAwesome6 name="arrow-trend-up" size={12} color="black" /></Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },

  DBcard: {
    backgroundColor: '#EEF3FF',
    width: '48.5%',
    paddingTop: 16,
    paddingBottom: 10,
    paddingHorizontal: 14,
    borderRadius: 16
  },
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

export default Home;