/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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
  KeyboardAvoidingView,
  FlatList,
  I18nManager
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';

import { useNavigation } from '@react-navigation/native';
import MainHeader from '../comp/MainHeader';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import MainInput from '../comp/MainInput';
import MainButton from '../comp/MainButton';



function CheckoutShipping() {

  const { t } = useTranslation();

  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  function renderAddressList() {
    const renderItem = ({ item, index }) => {
      return (
        <View
          style={{
            ...styles?.addressView
          }}
        >
          <View style={{ ...styles?.row }}>
            <Image
              source={icons?.check}
              style={{
                ...styles?.selectIcon
              }}
            />
            <Text
              style={{
                ...styles?.txtType
              }}
            >Home</Text>
          </View>
          <Text
            style={{
              ...styles?.addresstxt,
              width: '70%'
            }}
            numberOfLines={2}
          >
            ALryadh,alolaia,Building 18, floor 2,flat 6
          </Text>
          <Text
            style={{
              ...styles?.addresstxt
            }}
          >0 55 800 1979
          </Text>
        </View>
      )
    }
    const header = () => {
      return (
        <View style={{
          ...styles?.row,
          ...styles?.Addressheader
        }}>
          <Text style={{ ...FONTS?.h2, fontSize: 16 }}>
            {t('common:Chooseaddress')}
          </Text>
          <View style={{ ...styles?.row }}>
            <Image
              style={{
                height: 24,
                width: 24,
                tintColor: COLORS?.primary
              }}
              source={icons?.add} />
            <Text
              style={{
                ...FONTS?.h2,
                fontSize: 16,
                color: COLORS?.primary
              }}
            >{t('common:ana')}</Text>
          </View>
        </View>
      )
    }
    return <FlatList
      data={[1, 1]}
      renderItem={renderItem}
      ListHeaderComponent={header}
    />
  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS?.white, flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader
        leftIcon={I18nManager?.isRTL?icons?.LArrow:icons?.RArrow}
        // title={t('common:cart')}
        leftIconAction={() => {
          navigation?.goBack()
        }}
      />
      <Image
        source={images?.checkoutShiping}
        style={{
          width: '80%',
          alignSelf: 'center',
          height: 66,
          marginBottom: 32,
          marginTop: 26
        }}
      />

      {renderAddressList()}

      <MainButton
        text={t('common:gtp')}
        style={{
          marginBottom: 20
        }}
        onPress={() => {
          navigation.navigate('CheckoutPayment')
        }}
      />


    </SafeAreaView>
  );
}



export default CheckoutShipping;
