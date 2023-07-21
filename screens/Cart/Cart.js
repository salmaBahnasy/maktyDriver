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



function Cart() {

  const { t } = useTranslation();

  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  function cartItem() {
    const renderItem = ({ item, index }) => {
      return (
        <View style={{
          ...styles?.itemView
        }}>
          <Image
            source={images?.offerDefauteimage}
            style={{
              ...styles?.itemImg
            }}
          />
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={{ ...styles?.txt }}>
              Product name here
            </Text>
            <View style={{
              ...styles?.row,
              ...styles?.footerRowItem
            }}>
              <Text style={{ ...styles?.txt }}>
                35 Sar
              </Text>
              <View style={{ ...styles?.row, alignSelf: 'flex-end' }}>
                <Image
                  source={icons?.decrease}
                  style={{ ...styles?.smallIcon }}
                />
                <Text style={{ ...styles?.txt, marginHorizontal: 14 }}>
                  1
                </Text>
                <Image
                  source={icons?.increase}
                  style={{ ...styles?.smallIcon }}
                />
              </View>
            </View>
          </View>


        </View>
      )
    }
    return <FlatList
      data={[1, 1]}
      renderItem={renderItem}
      style={{
        backgroundColor: COLORS?.white,
        marginVertical: 8
      }}
    />
  }
  function promoCodeView() {
    return (
      <View style={{ marginHorizontal: 14 }}>
        <Text style={{ ...styles?.headerTitle }}>
          {t('common:Promocode')}
        </Text>
        <View style={{ ...styles?.row }}>
          <MainInput
            style={{
              width: "75%"

            }}
            placeholder={t('common:Enterpromocode')}
          />
          <MainButton
            style={{
              width: '25%'
            }}
            text={t('common:done')}
            onPress={() => {
              // navigation.navigate('CheckoutShipping')
            }}
          />
        </View>
      </View>
    )
  }
  function resetView() {
    const renderItem = (key, val, style) => {
      return <View style={{
        ...styles?.row,
        justifyContent: 'space-between',
        marginVertical: 7
      }}>
        <Text style={{ ...FONTS?.h4, fontSize: 16, ...style }}>{key}</Text>
        <Text style={{ ...FONTS?.h4, fontSize: 16, ...style }}>{val}</Text>

      </View>
    }
    return (
      <View
        style={{ marginHorizontal: 14, marginBottom: 20 }}
      >
        <Text style={{ ...styles?.headerTitle, marginTop: 16 }}>
          {t('common:total')}
        </Text>
        <View
          style={{
            // height: 171,
            backgroundColor: COLORS?.gray,
            borderRadius: 10,
            padding: 16
          }}
        >
          {renderItem(t('common:Sub_total'), "200 sar", { color: COLORS?.gray1 })}
          {renderItem(t('common:VAT'), "200 sar", { color: COLORS?.gray1 })}
          {renderItem(t('common:Promocode'), "200 sar", { color: COLORS?.gray1 })}
          {renderItem(t('common:total'), "200 sar", { color: COLORS?.appBlack })}

        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS?.white, flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader
        leftIcon={I18nManager?.isRTL?icons?.LArrow: icons?.RArrow}
        title={t('common:cart')}
        leftIconAction={() => {
          navigation?.goBack()
        }}
      />
      <ScrollView >
        {cartItem()}
        {promoCodeView()}
        {resetView()}
        <MainButton
          text={t('common:Checkout')}
          style={{
            marginBottom: 20
          }}
          onPress={() => {
            navigation.navigate('CheckoutShipping')
          }}
        />
      </ScrollView>


    </SafeAreaView>
  );
}



export default Cart;
