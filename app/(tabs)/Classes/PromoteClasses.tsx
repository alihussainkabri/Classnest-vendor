import { HStack } from '@/components/ui/hstack';
import { userContext } from '@/context/UserContext';
import { node_url, url } from '@/helpers';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { colors, fonts } from '../../../config/Config';

const PromoteClasses = () => {

  const [list, setList] = useState([])
  const { user } = useContext(userContext)

  async function fetchClasses() {
    const response = await fetch(url + "fetch-vendor-classes", {
      headers: {
        "Authorization": `Bearer ${user?.token}`
      }
    })

    if (response.ok == true) {
      const data = await response.json()

      if (data?.status == 200) {
        setList(data?.list)
      } else {
        Toast.error(data?.message)
      }
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])


  const ColorsList = [
    { dark: "#6834BA", light: "rgba(104, 52, 186, 0.4)" },
    { dark: "#002858", light: "rgba(0, 40, 88, 0.4)" },
    { dark: "#1DA1F2", light: "rgba(29, 161, 242, 0.4)" },
    { dark: "#FF6384", light: "rgba(255, 99, 132, 0.4)" },
    { dark: "#FF9F40", light: "rgba(255, 159, 64, 0.4)" },
    { dark: "#4BC0C0", light: "rgba(75, 192, 192, 0.4)" },
    { dark: "#36A2EB", light: "rgba(54, 162, 235, 0.4)" },
    { dark: "#9966FF", light: "rgba(153, 102, 255, 0.4)" },
    { dark: "#FFCD56", light: "rgba(255, 205, 86, 0.4)" },
    { dark: "#28A745", light: "rgba(40, 167, 69, 0.4)" },
    { dark: "#DC3545", light: "rgba(220, 53, 69, 0.4)" },
    { dark: "#6C757D", light: "rgba(108, 117, 125, 0.4)" },
    { dark: "#17A2B8", light: "rgba(23, 162, 184, 0.4)" },
    { dark: "#FF6F61", light: "rgba(255, 111, 97, 0.4)" },
    { dark: "#6F42C1", light: "rgba(111, 66, 193, 0.4)" },
    { dark: "#FD7E14", light: "rgba(253, 126, 20, 0.4)" },
    { dark: "#20C997", light: "rgba(32, 201, 151, 0.4)" },
    { dark: "#6610F2", light: "rgba(102, 16, 242, 0.4)" },
    { dark: "#FFC107", light: "rgba(255, 193, 7, 0.4)" },
    { dark: "#0D6EFD", light: "rgba(13, 110, 253, 0.4)" }
  ]

  const testArr = ['robotics', 'Coding', "DBMS", 'AI'];

  const inset = useSafeAreaInsets()
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
      <ImageBackground source={require('../../../assets/images/above-banner.png')} style={styles.BGImg}>
        <HStack style={{ justifyContent: 'space-between', paddingTop: inset.top + 36, marginHorizontal: 16 }}>
          <Text style={{ marginTop: 3, fontFamily: fonts.IntBold, color: 'white', fontSize: 22, marginBottom: 3 }}>Promote Classes</Text>
          <TouchableOpacity>
            <Image source={require('../../../assets/images/code-icon.png')} style={{ height: 40, width: 40, borderRadius: 100 }} />
          </TouchableOpacity>
        </HStack>
      </ImageBackground>

      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#F6F7FB', paddingBottom: 16 }}>
          <View style={{ marginHorizontal: 16, paddingTop: 28 }}>
            {list?.length > 0 && list?.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => {
                router.push({
                  pathname: 'Classes/ClassDetails',
                  params : {
                    class_id : item?.id
                  }
                })
              }}>
                <View style={{ backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 16, marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <Text style={{ fontFamily: fonts.IntBold, fontSize: 18, flexShrink: 1, color: '#002858' }} numberOfLines={2} ellipsizeMode="tail">{item?.display_name}</Text>
                      {item?.class_location && <Text style={{ textTransform: 'capitalize', fontFamily: fonts.IntBold, fontSize: 14, color: '#002858', marginTop: 10 }}><FontAwesome6 name="location-dot" size={16} color={ColorsList[index].dark} />  {item?.class_location && JSON?.parse(item?.class_location)?.address}</Text>}
                    </View>
                    <Image source={{ uri: `${node_url}${item?.thumbnail_images}` }} style={{ width: 40, height: 40, borderRadius: 100, resizeMode: 'cover' }} />
                  </View>

                  <View style={{ width: '100%', height: 3, backgroundColor: ColorsList[index].light, borderRadius: 10, marginVertical: 16 }}></View>
                  <Text style={{ fontFamily: fonts.IntBold, fontSize: 12 }}><FontAwesome5 name="clock" size={16} color="black" /> 9:00AM - 6:00PM (10 slots)</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => router.push('Classes/ClassDetails')}>
              <Text>hi</Text>
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
    height: Dimensions.get('window').height / 100 * 16,
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

export default PromoteClasses;