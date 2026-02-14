
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { colors, fonts } from '../../config/Config';
import { userContext } from '../../context/UserContext';
import { url } from '../../helpers';


const SetupScreen1 = () => {
  const inset = useSafeAreaInsets()
  const [name, setName] = useState("")
  const [accountType, setAccountType] = useState('Individual')
  const { user, setUser } = useContext(userContext)

  useEffect(() => {
    if(user?.account_type){
      setAccountType(user?.account_type)
    }

    if (user?.person_name){
      setName(user?.person_name)
    }
  },[user])

  async function submit() {
    const formData = new FormData()

    formData.append("person_name", name)
    formData.append("account_type", accountType)

    const response = await fetch(url + "vendor-onboarding/step-1", {
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

        if (accountType == "Individual") {
          setTimeout(() => {
            router.push({
              pathname: 'Vendor/SelectCourses',
              params: { accountType, name }
            })
          }, 200);
        } else {
          setTimeout(() => {
            router.push({
              pathname: 'Vendor/SetupScreen2',
              params: { accountType },
            })
          }, 200);
        }



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
            <InputField value={name}
              onChangeText={e => setName(e)} placeholder="e.g John Doe" style={{ color: 'red', borderWidth: 1, borderRadius: 12, borderColor: '#C6C9D2', fontFamily: fonts.IntReg, paddingLeft: 16 }} />
          </Input>

          <Text style={{ color: '#17181C', fontFamily: fonts.IntSB, fontSize: 16, marginTop: 26 }}>Account Type</Text>
          <HStack space="md" style={{ marginTop: 12 }}>
            <TouchableOpacity onPress={() => setAccountType('Individual')} style={[styles.AccBTN, { backgroundColor: accountType == 'Individual' ? colors.primary : "#F1F2F4" }]}>
              <Text style={[styles.BTNtext, { color: accountType == 'Individual' ? 'white' : "#666D80" }]}>Individual Tutor</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAccountType('Business')} style={[styles.AccBTN, { backgroundColor: accountType == 'Business' ? colors.primary : "#F1F2F4" }]}>
              <Text style={[styles.BTNtext, { color: accountType == 'Business' ? 'white' : "#666D80" }]}>Institute / Business</Text>
            </TouchableOpacity>
          </HStack>

        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            if (name && accountType) {
              submit()
            } else {
              Toast.error("Please fill all details")
            }
          }} activeOpacity={.8} style={[styles.whiteBTN, { marginBottom: inset.bottom }]}>
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