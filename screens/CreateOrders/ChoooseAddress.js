/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, icons, images, SIZES } from '../../constants';
import MainInput from '../comp/MainInput';
import MainButton from '../comp/MainButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MainHeader from '../comp/MainHeader';
import { useTranslation } from 'react-i18next';
import { getCurrentLocation } from '../comp/services/MainServices';
import AsyncStorage from '@react-native-async-storage/async-storage';



function ChoooseAddress() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const route = useRoute()
  const { t } = useTranslation();
  const [longitude, setlongitude] = useState()
  const [latitude, setlatitude] = useState()

  useEffect(() => {
    getCurrentLocationFunc()
  }, [])
  const getCurrentLocationFunc = () => {
    getCurrentLocation().then(location => {
      console.log({location})
      if (location) {
        setlatitude(location?.latitude)
        setlongitude(location?.longitude)
      }
    })
  }
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader
        style={{
          position: 'absolute',
          zIndex: 2,
        }}
        img={{
          width: 40,
          height: 40
        }}
        leftIcon={icons?.locationcircle}
        title={t('common:delvto')}
        leftIconAction={() => {
          navigation?.goBack()
        }}
      />
      <View style={{
        ...styles?.searchView,
        position: 'absolute',
        zIndex: 2,
        top: 100,
      }}>
        <MainInput
          leftIcon={icons?.search}
          style={{
            ...styles?.searchInput,
            backgroundColor: COLORS?.white

          }}
          textInputStyle={{
            ...styles?.searchtext
          }}
          placeholder={t('common:search')}
          onChange={(val) => {

          }}
        />

      </View>
      {latitude && longitude ? <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          onPress={(e) => {
            console.log(e)
            let cc = e.nativeEvent.coordinate
            console.log('onpres', e.nativeEvent.coordinate)
            setlatitude(e.nativeEvent.coordinate?.latitude)
            setlongitude(e.nativeEvent.coordinate?.longitude)
          }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={'موقعك الحالي'}
            draggable={true}
            onDragEnd={(e) => {
              console.log('dragEnd', e.nativeEvent.coordinate)
            }}

          >
            <Image source={icons?.location}
              style={{
                ...styles?.pinIcon
              }}
            />
          </Marker>
        </MapView>
        <MainButton
          style={{
            ...styles?.btn
          }}
          text={
            route?.params?.btnLabel ?
              route?.params?.btnLabel :
              t('common:Deliverhere')}
          onPress={() => {
            if (route?.params?.type == 'to') {
              let delToData = {
                "to_address": `to_address String ${latitude} ,${longitude}`,
                "to_latitude": JSON.stringify(latitude),
                "to_longitude": JSON.stringify(longitude),
                "details":route?.params?.details

              }
              AsyncStorage.setItem('deliveTo', JSON.stringify(delToData))
              navigation?.navigate('DeliverDetails', {
                data: {
                  deliverTo: delToData,
                  type: route?.params?.type,
                }
              })
            } else {
              let delfromData = {
                "from_address": `from address String ${latitude} ,${longitude}`,
                "from_latitude": JSON.stringify(latitude),
                "from_longitude": JSON.stringify(longitude),
                "details":route?.params?.details
              }
              AsyncStorage.setItem('pickUpFrom', JSON.stringify(delfromData))
              navigation?.navigate('DeliverDetails', {
                data: {
                  deliverfrom: delfromData,
                  type: route?.params?.type,
                }
              })
            }
          }}
        />
      </View> : <View
        style={{
          backgroundColor: COLORS?.B10
        }}
      />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: SIZES.height,
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,

  },
  searchView: {
    marginHorizontal: 13,
    marginTop: -20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 66,
    marginRight: 9,
    backgroundColor: COLORS?.bggray,
    borderRadius: 19,
  },
  searchtext: {
    textAlign: 'left',
    alignContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
  },
  pinIcon: {
    width: 50,
    height: 80,
    resizeMode: 'contain',
    tintColor: COLORS?.primary,
  },
  btn: {
    position: 'absolute',
    zIndex: 2,
    bottom: 30
  }
});

export default ChoooseAddress;
