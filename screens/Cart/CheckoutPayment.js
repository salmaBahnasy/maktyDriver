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
  Pressable,
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
import MainButton from '../comp/MainButton';



function CheckoutPayment() {

  const { t } = useTranslation();

  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const paymentmethods = [
    {
      title: 'Debit/Credit card',
      id: 1
    },
    {
      title: 'Cash on delivery',
      id: 2
    },
    {
      title: 'STC pay',
      id: 3
    },
    {
      title: 'Apple Pay',
      id: 4
    },
  ]
  function renderAddressList() {
    const renderItem = ({ item, index }) => {
      return (
        <Pressable
          style={{
            ...styles?.addressView,
            ...styles?.row,
            borderRadius: 9
          }}
        >
          <Image
            source={icons?.uncheck}
            style={{
              ...styles?.selectIcon,
              tintColor: COLORS?.gray1
            }}
          />
          <Text
            style={{ ...styles?.addresstxt }}
          >
            {item?.title}
          </Text>

        </Pressable>
      )
    }
    const header = () => {
      return (
        <View style={{
          ...styles?.row,
          ...styles?.Addressheader
        }}>
          <Text style={{ ...FONTS?.h2, fontSize: 16 }}>
            {t('common:cpm')}
          </Text>

        </View>
      )
    }
    return <FlatList
      data={paymentmethods}
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
        leftIcon={I18nManager?.isRTL? icons?.LArrow : icons?.RArrow}
        leftIconAction={() => {
          navigation?.goBack()
        }}
        onPress={() => {
          // navigation.navigate('CheckoutShipping')
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
        text={t('common:pay')}
        style={{
          marginBottom: 20
        }}
        onPress={() => {
          navigation.navigate('CheckoutReview')
        }}
      />


    </SafeAreaView>
  );
}



export default CheckoutPayment;
