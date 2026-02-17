import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useContext } from 'react';
import { Alert, Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../../config/Config';
import { userContext } from '../../../context/UserContext';

const ProfilePage = () => {
  const {setUser} = useContext(userContext)
  const inset = useSafeAreaInsets()

  const ProfileOptions = [
    { icon: <FontAwesome5 name="user" size={17} color="black" />, title: 'Edit Profile', navigateTo: '' },
    { icon: <Ionicons name="trophy-outline" size={17} color="black" />, title: 'Awards', navigateTo: 'Profile/Awards' },
    { icon: <FontAwesome5 name="user-shield" size={14} color="black" />, title: 'Certification', navigateTo: '' },
    { icon: <MaterialIcons name="lock-outline" size={17} color="black" />, title: 'Privacy Policy', navigateTo: '' },
    { icon: <Feather name="info" size={17} color="black" />, title: 'Help Center', navigateTo: '' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
      <ImageBackground source={require('../../../assets/images/above-banner.png')} style={styles.BGImg}>
        <Text style={{ marginTop: 3, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 3, textAlign: 'center', paddingTop: inset.top + 16 }}>My Profile</Text>
      </ImageBackground>

      <View style={{ flex: 1, justifyContent: 'space-between', borderTopLeftRadius: 80, borderTopRightRadius: 80, backgroundColor: 'white', marginTop: - Dimensions.get('window').height / 100 * 10 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 16 }}>
          <View style={{ paddingHorizontal: 26, paddingTop: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <View>
                <Image source={require('../../../assets/images/rounded.png')} style={{ width: 100, height: 100, borderRadius: 100, resizeMode: 'cover' }} />
                <TouchableOpacity style={{ backgroundColor: colors.primary, borderRadius: 100, padding: 6, position: 'absolute', bottom: 0, right: 0 }}>
                  <Feather name="edit-2" size={18} color="white" />
                </TouchableOpacity>
              </View>

              <Text style={{ fontFamily: fonts.IntBold, fontSize: 20, marginTop: 10 }}>Yahya Japan</Text>
              <Text style={{ fontFamily: fonts.IntSB, fontSize: 14 }}>yahyajapan.yj@gmail.com</Text>
              <View style={{ height: 1.5, marginTop: 36, marginBottom: 24, width: '100%', backgroundColor: '#EEEEEE' }}></View>
            </View>

            {ProfileOptions?.map((item, index) => (
              <TouchableOpacity onPress={() => router.push(item.navigateTo)} key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item?.icon}
                  <Text style={{ fontFamily: fonts.IntMed, fontSize: 15, marginLeft: 16 }}>{item?.title}</Text>
                </View>

                <AntDesign name="right" size={18} color="black" />
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => {
              Alert.alert("Logout","Are you sure you want to logout now",[
                {
                  text : 'Cancel',
                  onPress : () => null
                },
                {
                  text : 'Logout',
                  onPress : () => {
                    setUser(null)
                    AsyncStorage.removeItem("classnest_vendor")
                    router.push("Auth/Welcome")
                  }
                }
              ])
            }} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', paddingVertical: 12 }}>
              <MaterialIcons name="logout" size={17} color="#FF0004" />
              <Text style={{ fontFamily: fonts.IntBold, color: '#FF0004', fontSize: 15, marginLeft: 16 }}>Logout</Text>
            </TouchableOpacity>
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
    height: Dimensions.get('window').height / 100 * 25,
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

export default ProfilePage;