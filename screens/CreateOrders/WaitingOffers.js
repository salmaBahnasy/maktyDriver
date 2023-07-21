/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  I18nManager,
  FlatList
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS, icons } from '../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainHeader from '../comp/MainHeader';
import { useTranslation } from 'react-i18next';
var Spinner = require('react-native-spinkit');



function WaitingOffers() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const route = useRoute()
  const { t } = useTranslation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const [disable, setDisable] = useState(true)


  useEffect(() => {
    setTimeout(() => {
      navigation?.navigate('ShowOffers', {
        data: route?.params?.data
      })
    }, 3000)

  }, [])
  return (
    <SafeAreaView style={{ backgroundColor: COLORS?.white, flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader

        leftIcon={I18nManager.isRTL ? icons?.LArrow : icons?.RArrow}
        delivery={icons?.createOrder}
        leftIconAction={() => {
          navigation?.goBack()
        }}
        title={t('common:den')}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
        }}
      >
        <Text style={{
          ...styles?.boldStartTxt
        }}>
          {t('common:edc')}
        </Text>
        <View
          style={{
            ...styles?.devData
          }}
        >
          <Text
            style={{
              ...styles?.txt
            }}>
            {route?.params?.data?.deliveryPrice} {t('common:SAR')}
          </Text>
        </View>
        <View
          style={{
            ...styles?.waitView
          }}
        >
          <Text style={{
            ...styles?.boldCenter,
            marginBottom: 8,
          }}>
            {t('common:Pleasewait')}
          </Text>
          <Text style={{
            ...styles?.boldCenter,
            marginHorizontal: 20,
          }}>
            {t('common:waitfa')}
          </Text>
        </View>

        <Spinner
          style={{
            alignSelf: 'center',
            marginTop: 112,

          }}
          color={COLORS?.primary}
          isVisible={true}
          type={'WanderingCubes'}
        />

        <Text style={{
          ...styles?.boldCenter,
          marginVertical: 16,

        }}>
          {t('common:wfo')}
        </Text>
        <View
          style={{
            ...styles?.grayView
          }}
        >
          <Text style={{
            ...styles?.boldCenter,
            marginBottom: 8,

          }}>
            {t('common:aco')}
          </Text>
          <View
            style={{
              ...styles?.row,
              ...styles?.center
            }}
          >
            <Text style={{
              ...styles?.boldCenter
            }}>
              {t('common:Disable')}
            </Text>
            <Image
              source={disable ? icons?.trueSwitch : icons?.falseSwitch}
              style={{
                ...styles?.toggleIcon
              }}
            />

          </View>

        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  boldStartTxt: {
    ...FONTS?.h2,
    color: COLORS?.primary,
    fontSize: 16,
    marginVertical: 16,
    alignSelf: 'flex-start'
  },
  devData: {
    marginHorizontal: 24,
    backgroundColor: COLORS?.gray,
    borderRadius: 6,
    height: 64,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center'
  },
  waitView: {
    marginHorizontal: 24,
    backgroundColor: COLORS?.gray,
    borderRadius: 6,
    width: '100%',
    alignSelf: 'center',
    marginTop: 16,
    padding: 16
  },
  txt: {
    ...FONTS?.h2,
    fontSize: 18,
    color: COLORS?.appBlack
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  boldCenter: {
    ...FONTS?.h2,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS?.primary,
    textAlign: 'center'
  },
  toggleIcon: {
    width: 58,
    height: 28,
    resizeMode: 'contain'
  },
  grayView: {
    marginHorizontal: 24,
    backgroundColor: COLORS?.gray,
    borderRadius: 6,
    width: '100%',
    alignSelf: 'center',
    marginTop: 16,
    padding: 16
  }

})

export default WaitingOffers;
