import { HStack } from '@/components/ui/hstack';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../config/Config';

const InterestedSeekers = () => {
  const [activeTab, setActiveTab] = useState('New Leads')

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='black' barStyle="dark-content" />
      <HStack style={{ backgroundColor: 'white', paddingTop: 16 }}>
        <TouchableOpacity onPress={() => setActiveTab('New Leads')} style={[styles.toggler, activeTab === 'New Leads' && styles.togglerActive]}>
          <Text style={[styles.togglerText, activeTab === 'New Leads' && styles.toggleTextActive]}>New Leads</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('Converted')} style={[styles.toggler, activeTab === 'Converted' && styles.togglerActive]}>
          <Text style={[styles.togglerText, activeTab === 'Converted' && styles.toggleTextActive]}>Converted</Text>
        </TouchableOpacity>
      </HStack>

      <View style={styles.divider}></View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#F6F7FB', paddingTop: 24, }} contentContainerStyle={{paddingBottom: 32}}>
        <View style={[styles.row, { paddingHorizontal: 16, marginBottom: 10 }]}>
          <View style={{ height: '65%', width: 3.5, borderRadius: 100, backgroundColor: 'red' }}></View>
          <View style={[styles.cardStyle, styles.shadow]}>
            <View style={[styles.row]}>
              <Image style={{ width: 38, height: 38, borderRadius: 8 }} source={require('../../../assets/images/rounded.png')} />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontFamily: fonts.IntBold, fontSize: 15, color: '#002858' }}>Bhargav</Text>
                <Text style={{ fontFamily: fonts.IntBold, fontSize: 10, color: '#727070' }}>For Robotics</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ backgroundColor: '#FFF4CB', paddingVertical: 6, paddingHorizontal: 7, borderRadius: 6, alignSelf: 'center' }}>
                <Text style={{ fontFamily: fonts.IntBold, fontSize: 8, color: '#CEA202' }}>Mark as Converted</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.contactBTN, { marginHorizontal: 4 }]}>
                <FontAwesome name="phone" size={14} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactBTN}>
                <MaterialIcons name="chat" size={14} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flex: 1
  },
  toggler: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 14,
    marginHorizontal: 42
  },
  togglerActive: {
    borderBottomWidth: 2.5,
    borderBottomColor: '#002858',
  },
  togglerText: {
    fontSize: 15,
    fontFamily: fonts.IntSB,
    color: '#ACAAAA',
  },
  toggleTextActive: {
    fontFamily: fonts.IntBold,
    color: '#002858',
  },
  contactBTN: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 8
  },
  shadow: {
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  }
})


export default InterestedSeekers;