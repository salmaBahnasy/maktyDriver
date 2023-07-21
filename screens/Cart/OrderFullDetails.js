
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Image,
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
import MainButton from '../comp/MainButton';



function OrderFullDetails() {

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

                <Text style={{ ...styles?.txt, marginHorizontal: 14 }}>
                  x1
                </Text>

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
      ListHeaderComponent={() => {
        return (
          <Text
            style={{
              ...styles?.orderDetailstxt
            }}
          >
            {t('common:Orderdetails')}
          </Text>
        )
      }}
    />
  }

  function resetView() {
    const renderItem = (key, val, style) => {
      return <View style={{
        ...styles?.row,
        justifyContent: 'space-between',
        marginVertical: 7
      }}>
        <Text style={{ ...FONTS?.h4, fontSize: 16,alignSelf:'flex-start', ...style }}>{key}</Text>
        <Text style={{ ...FONTS?.h4, fontSize: 16,alignSelf:'flex-start' ,...style }}>{val}</Text>
      </View>
    }
   
    return (
      <View
        style={{ marginHorizontal: 14, }}
      >
        <View
          style={{
            ...styles?.resetView
          }}
        >
         
          <Text style={{ ...styles?.headerTitle, marginTop: 16 }}>
            {t('common:Shippingaddress')}
          </Text>
          <View>
            <Text style={{ ...styles?.addresstxt, marginTop: 16 }}>
              Maya adel
            </Text>
            <Text style={{ ...styles?.addresstxt, marginTop: 16 }}>
              Work
            </Text>
            <Text style={{ ...styles?.addresstxt, marginTop: 16 }}>
              ALryadh,alolaia,Building 18, floor 2,flat 6
            </Text>
            <Text style={{ ...styles?.addresstxt, marginTop: 16 }}>
              0 55 567 1979
            </Text>
          </View>
          <Text style={{ ...styles?.headerTitle, marginTop: 16 }}>
            {t('common:Paymentmethod')}
          </Text>
          <Text style={{ ...FONTS?.h4, fontSize: 16, color: COLORS?.gray1 }}>Cash on delivery</Text>

          <View
            style={{
              height: 1,
              marginHorizontal: 21,
              backgroundColor: COLORS?.gray1,
              alignSelf: 'center',
              width: '100%',
              marginVertical: 17
            }}
          />
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
        leftIcon={I18nManager?.isRTL?icons?.LArrow : icons?.RArrow}
        // title={t('common:cart')}
        leftIconAction={() => {
          navigation?.goBack()
        }}
      />
      <ScrollView >
        <Image
          source={images?.orderd}
          style={{
           width:142,
           height:153,
           margin:16
          }}
        />
        <View>
          <Text style={{...FONTS?.body4,paddingHorizontal:24,alignSelf:'flex-start'}}>Order wait to pick up by driver</Text>
          <Text></Text>
        </View>
        {resetView()}
        {cartItem()}

        <MainButton
          text={"Place order"}
          style={{
            marginBottom: 20
          }}
          onPress={() => {
            // navigation.navigate('CheckoutShipping')
          }}
        />
      </ScrollView>


    </SafeAreaView>
  );
}



export default OrderFullDetails;
