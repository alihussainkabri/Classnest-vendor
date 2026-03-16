import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Pressable } from '@/components/ui/pressable';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../../config/Config';
import { userContext } from '../../../context/UserContext';
import { node_url, url } from '../../../helpers';

const ClassDetails = () => {
  const [selectedTab, setSelectedTab] = useState('About')
  const [expanded, setExpanded] = useState(false);
  const { class_id } = useLocalSearchParams()
  const { user } = useContext(userContext)
  const [details, setDetails] = useState("")

  const screenWidth = Dimensions.get("window").width;
  const spacing = 12;
  const numColumns = 3;
  const itemWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;

  const TeamSpacing = 16;
  const TeamItemWidth = (screenWidth - TeamSpacing * 4) / 3;

  const images = [
    { id: 1, source: require('../../../assets/images/home-verify.png'), name: 'yahya' },
    { id: 2, source: require('../../../assets/images/welcome.png'), name: 'yahya' },
    { id: 3, source: require('../../../assets/images/react-logo.png'), name: 'yahya' },
    { id: 4, source: require('../../../assets/images/successBG.png'), name: 'yahya' },
    { id: 5, source: require('../../../assets/images/above-banner.png'), name: 'yahya' },
    { id: 6, source: require('../../../assets/images/android-icon-background.png'), name: 'yahya' },
    { id: 7, source: require('../../../assets/images/user-icon.png'), name: 'yahya' },
    { id: 8, source: require('../../../assets/images/code-icon.png'), name: 'yahya' },
  ]

  const inset = useSafeAreaInsets()

  async function classDetails() {
    const response = await fetch(url + `fetchClassDetails/${class_id}`, {
      headers: {
        "Authorization": `Bearer ${user?.token}`
      }
    })

    if (response.ok == true) {
      const data = await response.json()
      console.log(JSON.stringify(data))
      setDetails(data?.details)
    }
  }

  useEffect(() => {
    classDetails()
  }, [class_id])

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: `${node_url}${details?.thumbnail_images}` }} style={styles.BGImg}>
          <View style={{ flexDirection: 'row', paddingTop: inset.top + 12, marginHorizontal: 16, justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, paddingLeft: 0 }}>
              <Ionicons name="arrow-back" size={22} color="white" />
            </TouchableOpacity>

            <Menu
              placement="top"
              offset={5}
              borderRadius={16}
              p="$2"
              backgroundColor='white'
              borderWidth={0}
              trigger={({ ...triggerProps }) => {
                return (
                  <TouchableOpacity {...triggerProps} style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#EDEAEA', borderRadius: 100, height: 35, width: 35, alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
                  </TouchableOpacity>
                );
              }}
            >
              <MenuItem onPress={() => router.push({
                  pathname : 'Vendor/ListingClass1',
                  params : {
                    class_id : class_id,
                    class_details : JSON.stringify(details)
                  }
                })} key="Add account" textValue="Add account">
                <FontAwesome6 name="edit" size={16} color="black" />
                <MenuItemLabel size="sm" style={{ marginLeft: 12, color: 'black', fontFamily: fonts.IntReg }} >Edit</MenuItemLabel>
              </MenuItem>
              <MenuItem key="Community" textValue="Community">
                <AntDesign name="file-excel" size={16} color="black" />
                <MenuItemLabel size="sm" style={{ marginLeft: 12, color: 'black', fontFamily: fonts.IntReg }}>Deactivate</MenuItemLabel>
              </MenuItem>
            </Menu>
          </View>
        </ImageBackground>

        <View style={{ flex: 1, justifyContent: 'space-between', borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: 'white', marginTop: - Dimensions.get('window').height / 100 * 2 }}>

          <View style={{ marginHorizontal: 16, paddingTop: 20 }}>
            <HStack style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <HStack style={{ alignItems: 'center', backgroundColor: '#FFCF1F', borderRadius: 6, paddingVertical: 6, paddingHorizontal: 8 }}>
                <Entypo name="megaphone" size={16} color="black" />
                <Text style={{ fontFamily: fonts.IntBold, fontSize: 9, color: '#1E1E1E', marginLeft: 6 }}>Sponsored</Text>
              </HStack>

              <HStack style={{ alignItems: 'center' }}>
                <Entypo name="star" size={22} color="#FFCF1F" />
                <Text style={{ fontFamily: fonts.IntBold, fontSize: 14, color: '#002858', marginLeft: 4 }}>4.5 <Text style={{ fontFamily: fonts.IntMed, fontSize: 10 }}> (300 reviews)</Text></Text>
              </HStack>
            </HStack>

            <HStack style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 28, marginBottom: 6 }}>
              <Text style={{ fontFamily: fonts.IntBold, fontSize: 19, color: '#002858', marginRight: 12 }}>
                {details?.display_name}
              </Text>

              <HStack style={{ alignItems: 'center', backgroundColor: '#16A34A', borderRadius: 10, paddingVertical: 6, paddingHorizontal: 12 }}>
                <MaterialIcons name="verified" size={14} color="white" />
                <Text style={{ fontFamily: fonts.IntSB, fontSize: 10, color: 'white', marginLeft: 6 }}>Verified</Text>
              </HStack>
            </HStack>

            <Text style={{ fontFamily: fonts.IntMed, fontSize: 15 }}>
              {details?.category_name}
            </Text>
            <Text style={{ fontFamily: fonts.IntReg, fontSize: 16, marginTop: 12 }}>Starting From</Text>
            <Text style={{ fontFamily: fonts.IntBold, fontSize: 28 }}>₹5,000 <Text style={{ fontFamily: fonts.IntReg }}>/-</Text></Text>

            {/* 3 tabs section */}
            <HStack style={[styles.shadow, { backgroundColor: '#F8F9FA', justifyContent: 'space-between', padding: 8, borderRadius: 100, marginTop: 20 }]}>
              <TouchableOpacity onPress={() => setSelectedTab('About')} style={[styles.tabView, selectedTab == 'About' && styles.tabViewActive]}>
                <Text style={[styles.tabViewTxt, selectedTab == 'About' && styles.tabViewTxtActive]}>About</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSelectedTab('Photos')} style={[styles.tabView, selectedTab == 'Photos' && styles.tabViewActive]}>
                <Text style={[styles.tabViewTxt, selectedTab == 'Photos' && styles.tabViewTxtActive]}>Photos</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSelectedTab('Reviews')} style={[styles.tabView, selectedTab == 'Reviews' && styles.tabViewActive]}>
                <Text style={[styles.tabViewTxt, selectedTab == 'Reviews' && styles.tabViewTxtActive]}>Reviews</Text>
              </TouchableOpacity>
            </HStack>

            <View style={{ marginTop: 32 }}>
              {/* About section */}
              {selectedTab == 'About' && <View>
                <Text style={{ color: '#002858', fontSize: 17, fontFamily: fonts.IntBold }}>About {details?.display_name}</Text>
                <Text numberOfLines={expanded ? undefined : 3} ellipsizeMode="tail" style={{ fontSize: 13, fontFamily: fonts.IntReg, marginTop: 12, lineHeight: 24 }}>
                  {details?.description}
                </Text>
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                  <Text style={{ color: "#37B5FF", marginTop: 4 }}>{expanded ? "Read Less" : "Read More"}</Text>
                </TouchableOpacity>
              </View>}

              {selectedTab == 'Photos' && <View>
                <Text style={{ color: '#002858', fontSize: 17, fontFamily: fonts.IntBold }}>Photos</Text>

                <FlashList
                  style={{}}
                  data={images}
                  keyExtractor={(item) => item.toString()}
                  numColumns={3}
                  estimatedItemSize={200}
                  contentContainerStyle={{ padding: spacing }}
                  renderItem={({ item }) => (
                    <Pressable mb="3">
                      <Box
                        borderRadius="xl"
                        overflow="hidden"
                        bg="coolGray100"
                      >
                        <Image
                          source={item?.source}
                          style={{
                            width: itemWidth,
                            height: itemWidth,
                            // aspectRatio: item.width / item.height,
                          }}
                          resizeMode="cover"
                        />
                      </Box>
                    </Pressable>
                  )}
                />
              </View>}

              {selectedTab == 'Reviews' && <View>
                <Text style={{ color: '#002858', fontSize: 17, fontFamily: fonts.IntBold }}>Ratings & Reviews</Text>
                <HStack style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingBottom: 18, borderBottomWidth: 1.5, borderBottomColor: '#ebebeb' }}>
                  <HStack>
                    <Image source={require('../../../assets/images/user-icon.png')} style={{ width: 50, height: 50, borderRadius: 100 }} />
                    <View style={{ marginLeft: 20 }}>
                      <Text style={{ fontFamily: fonts.IntBold, fontSize: 15, color: '#002858' }}>Bhargav</Text>
                      <HStack style={{ marginTop: 4, alignItems: 'center' }}>
                        <FontAwesome name="star" size={15} color="#FFCF1F" style={{ marginRight: 4 }} />
                        <FontAwesome name="star" size={15} color="#FFCF1F" style={{ marginRight: 4 }} />
                        <FontAwesome name="star" size={15} color="#FFCF1F" style={{ marginRight: 4 }} />
                        <FontAwesome name="star" size={15} color="#FFCF1F" style={{ marginRight: 4 }} />
                        <FontAwesome name="star-half" size={15} color="#FFCF1F" style={{ marginRight: 4 }} />
                        <Text style={{ fontFamily: fonts.IntMed, fontSize: 14, color: '#002858', marginLeft: 4 }}>4.5</Text>
                      </HStack>
                    </View>
                  </HStack>
                  <Text style={{ fontFamily: fonts.IntMed, fontSize: 11, color: '#002858', marginRight: 20 }}>3 days ago</Text>
                </HStack>
              </View>}
            </View>
          </View>

          {/* Awards section */}
          <View style={{ borderRadius: 30, overflow: 'hidden', }}>
            <ImageBackground resizeMode='stretch' source={require('../../../assets/images/awards-bg.png')} style={styles.AwardsBG}>
              <HStack style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 22, fontFamily: fonts.IntBold, color: 'white' }}>Awards</Text>
                <View style={{ width: 120, height: 3, backgroundColor: 'white', marginTop: 6, marginLeft: 18 }}></View>
              </HStack>

              <HStack style={{ flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', marginBottom: 8 }}>
                {details?.awards?.length > 0 && details?.awards?.map((item, index) => (
                  <View style={{ flexDirection: 'row', width: '47%', marginTop: 10 }} key={index}>
                    {item?.file ? <Image source={{uri : `${node_url}${item?.file}`}} style={{ width: 45, height: 45 }} /> : <Image source={require('../../../assets/images/award.png')} style={{ width: 45, height: 45 }} />}
                    
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text style={{ fontFamily: fonts.IntBold, fontSize: 10, color: 'white' }}>{item?.title}</Text>
                      <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontFamily: fonts.IntReg, fontSize: 9, color: 'white' }}>
                        {item?.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </HStack>
            </ImageBackground>
          </View>

          {/* our experts section */}
          {details?.instructors?.length > 0 && <View>
            <Text style={{ fontFamily: fonts.IntBold, fontSize: 15, color: '#002858', marginHorizontal: 16, marginBottom: 32 }}>Meet Our Expert Team</Text>
            <FlatList
              data={details?.instructors}
              numColumns={3}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingHorizontal: TeamSpacing }}
              columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
              renderItem={({ item }) => (
                <View style={{ alignItems: 'center', width: TeamItemWidth }}>
                  <Image
                    source={require('../../../assets/images/home-verify.png')}
                    style={{
                      width: TeamItemWidth,
                      height: TeamItemWidth * 1.1,
                      borderRadius: 24,
                    }}
                    resizeMode="cover"
                  />

                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 18,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              )}
            />
          </View>}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  tabView: {
    paddingVertical: 8,
    borderRadius: 100,
    flex: 1
  },
  tabViewActive: {
    backgroundColor: colors.primary,
  },
  tabViewTxt: {
    fontFamily: fonts.IntMed,
    fontSize: 14,
    textAlign: 'center',
    color: '#5A6172'
  },

  tabViewTxtActive: {
    color: 'white',
    fontFamily: fonts.IntSB,
  },

  shadow: {
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  BGImg: {
    width: '100%',
    height: Dimensions.get('window').height / 100 * 35,
  },
  AwardsBG: {
    marginTop: 40,
    marginBottom: 30,
    paddingVertical: 30,
    paddingHorizontal: 16,
    resizeMode: 'stretch',
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

export default ClassDetails;