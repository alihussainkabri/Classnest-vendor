
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../config/Config';


const SetupScreen1 = () => {
  const inset = useSafeAreaInsets()

  const [accountType, setAccountType] = useState('individual')

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
      <ImageBackground source={require('../../assets/images/above-banner.png')} style={styles.BGImg}>
        <View style={{ paddingTop: inset.top + 4, marginHorizontal: 16 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, paddingLeft: 0 }}>
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>
          <Text style={{ marginTop: 26, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 12 }}>Set up your provider profile</Text>
          <Text style={{ fontFamily: fonts.IntMed, color: 'white', fontSize: 12 }}>This helps us tailor tools and leads for your business.</Text>
        </View>
      </ImageBackground>

      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ marginHorizontal: 16, }}>
          <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 26 }}>Your Name</Text>
          <Input
            variant="none"
            size="lg"
            isInvalid={false}
            isRequired
            style={{ height: 42, marginTop: 12 }}
          >
            <InputField placeholder="e.g John Doe" style={{ color: 'red', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontFamily: fonts.IntReg, paddingLeft: 16 }} />
          </Input>

          <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 26 }}>Account Type</Text>
          <HStack space="md" style={{ marginTop: 12 }}>
            <TouchableOpacity onPress={() => setAccountType('individual')} style={[styles.AccBTN, { backgroundColor: accountType == 'individual' ? colors.primary : "#F1F2F4" }]}>
              <Text style={[styles.BTNtext, { color: accountType == 'individual' ? 'white' : "#666D80" }]}>Individual Tutor</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAccountType('business')} style={[styles.AccBTN, { backgroundColor: accountType == 'business' ? colors.primary : "#F1F2F4" }]}>
              <Text style={[styles.BTNtext, { color: accountType == 'business' ? 'white' : "#666D80" }]}>Institute / Business</Text>
            </TouchableOpacity>
          </HStack>

        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.push({
            pathname: 'Vendor/SetupScreen2',
            params: { accountType },
          })} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: inset.bottom }]}>
            <Text style={styles.WhiteBTNText}>Next : Add Class Details</Text>
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
    fontSize: 13,
    textAlign: 'center'
  },
  AccBTN: {
    flex: 1,
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 10
  }
})

export default SetupScreen1;