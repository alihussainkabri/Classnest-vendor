import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../../config/Config';

const ProfilePage = () => {

  const inset = useSafeAreaInsets()
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
              <View style={{ height: 1.5, marginVertical: 36, width: '100%', backgroundColor: '#EEEEEE' }}></View>
            </View>

            <TouchableOpacity>
              <View>
                <FontAwesome5 name="user" size={16} color="black" />
                <Text style={{fontFamily: fonts.IntMed, fontSize: 14}}>Edit Profile</Text>
              </View>
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