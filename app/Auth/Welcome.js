import { router } from "expo-router"
import React from 'react'
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, fonts } from '../../config/Config'


const Welcome = ({ navigation }) => {
  const inset = useSafeAreaInsets()
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
      <ImageBackground source={require('../../assets/images/welcome.png')} style={styles.BGImg}>
        <View style={{ marginHorizontal: 20, alignItems: 'center' }}>
          <Text style={styles.heading}>Welcome to ClassNest!</Text>
          <Text style={{ fontFamily: fonts.IntMed, fontSize: 12, color: 'white', marginTop: 4, marginBottom: 12 }}>Your gateway to the best classes nearby</Text>
          <Text style={{ fontFamily: fonts.IntSB, fontSize: 18, color: 'white' }}>Choose better. Start faster.</Text>
          <TouchableOpacity onPress={() => router.push('Auth/Login')} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: 30 + inset.bottom, }]}>
            <Text style={styles.WhiteBTNText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BGImg: {
    width: '100%',
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end'
  },
  heading: {
    fontSize: 30,
    fontFamily: fonts.NSbold,
    color: 'white',
  },
  whiteBTN: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    marginTop: 38,
    borderRadius: 15
  },
  WhiteBTNText: {
    color: colors.primary,
    fontFamily: fonts.IntBold,
    fontSize: 16,
    textAlign: 'center',
  }
})

export default Welcome;