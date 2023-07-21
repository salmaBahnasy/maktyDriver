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
  FlatList,
  I18nManager
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import MainButton from '../comp/MainButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainHeader from '../comp/MainHeader';
import { useTranslation } from 'react-i18next';
import { CancelOrder, ConfirmDelegateOrder, FindDelegateOrder } from './services/services';
import { useMutation } from '@apollo/client';
var Spinner = require('react-native-spinkit');



function ShowOffers() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const route = useRoute()
  const { t } = useTranslation();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const [delegates, setDelegets] = useState([])
  const [loading, setloading] = useState(true)

  // ............................mutation..................................

  const [FindDelegateOrderRequest,
    { data: findDelegateOrderData,
      error: findDelegateOrderError}] = useMutation(FindDelegateOrder);
  console.log({ findDelegateOrderData })
  console.log({ findDelegateOrderError })

  const [AcceptDelegateOrderRequest,
    { data: acceptDelegateOrderData,
      error: acceptDelegateOrderError }] = useMutation(ConfirmDelegateOrder);
  console.log({ acceptDelegateOrderData })
  console.log({ acceptDelegateOrderError })

  const [CancelDelegateOrderRequest,
    { data: cancelDelegateOrderData,
      error: cancelDelegateOrderError }] = useMutation(CancelOrder);
  console.log({ cancelDelegateOrderData })
  console.log({ cancelDelegateOrderError })
  // ............................end..................................

  useEffect(() => {
    finddelegate()
  }, [])
  // ......................................................................
 
  const finddelegate = () => {
    console.log("route", route?.params.data)
    let obj = {
      order_id: JSON.parse(route?.params.data?.orderDetails?.createOrder?.data?.id)
    }
    console.log('finddelegate', obj)
    FindDelegateOrderRequest({
      variables: {
        input: obj
      },
    }
    ).then(result => {
      console.log(result)
      setDelegets(result?.data?.findDelegateOrder)
      setloading(false)
    })
  }
  const CancelOrderfun = () => {
    console.log("route", route?.params.data)
    let obj = {
      order_id: JSON.parse(route?.params.data?.orderDetails?.createOrder?.data?.id)
    }
    console.log('CancelOrderfun', obj)
    CancelDelegateOrderRequest({
      variables: {
        input: obj
      },
    }
    ).then(result => {
      console.log(result)
      // clearAsnc()
      finddelegate()

    })
  }
  const ConfirmDelegateOrderfnc = (id,item) => {
    console.log("route", route?.params.data)
    let obj = {
      order_id: JSON.parse(route?.params.data?.orderDetails?.createOrder?.data?.id),
      delegate_id:JSON.parse(id)
    }
    console.log('ConfirmDelegateOrderfnc', obj)
    AcceptDelegateOrderRequest({
      variables: {
        input: obj
      },
    }
    ).then(result => {
      console.log({result})
      navigation?.navigate('ChatScreen',{
        data:route?.params?.data,
        delegateData:item
      })

    })
  }
  // ............................Views....................................
  function offersView() {

    const renderItem = ({ item, index }) => {
      return (
        <View
          style={{
            ...styles?.ItemView
          }}
        >
          <View style={{ ...styles?.row }}>
            <Image
              source={item?.imagePath?{uri:item?.imagePath}: images?.user}
              style={{
                ...styles?.delegateImg
              }}
            />
            <View style={{ marginHorizontal: 16 }}>
              <Text style={{
                ...styles?.delegatetxt
              }}>{item?.name}</Text>
              <View style={{ ...styles?.row }}>
                <Image
                  source={icons?.desdination}
                  style={{
                    ...styles?.icon
                  }}
                />
                <Text style={{ ...styles?.smalltxt }}>250 trips  | </Text>
                <Text style={{ ...styles?.smalltxt }}>Joinged Dec 2022 </Text>
              </View>
              <View style={{ ...styles?.row }}>
                <Image
                  source={icons?.location}
                  style={{
                    ...styles?.icon
                  }}
                />
                <Text style={{ ...styles?.smalltxt }}>
                  2.0 km
                </Text>
                <Text style={{ ...styles?.smalltxt, color: COLORS?.primary, }}>
                  Near to pickup
                </Text>
              </View>

            </View>

          </View>
          <View style={{ ...styles?.row, justifyContent: 'space-between' }}>
            <Text style={{ ...styles?.txt }}>The offer</Text>
            <View style={{ ...styles?.row }}>
              <Text style={{ ...styles?.txt }}>{item?.rate}</Text>
              <Text style={{ ...FONTS?.h3, fontSize: 14, color: COLORS?.gray1 }}>Sar</Text>
            </View>
          </View>
          {/* .........footer btn......... */}
          <View style={{
            ...styles?.row,
            justifyContent: 'space-between',
            marginTop: 23
          }}>
            <MainButton
              style={{
                backgroundColor: COLORS?.gray,
                width: "25%"
              }}
              text={t('common:Reject')}
              Textstyle={{
                color: COLORS?.gray1
              }}
              onPress={() => {
                CancelOrderfun()

              }}
            />
            <MainButton
              style={{
                width: "65%"
              }}
              text={t('common:Accept')}
              icon={icons?.checkcircle}
              Textstyle={{
                marginHorizontal: 8
              }}
              onPress={() => {
                ConfirmDelegateOrderfnc(item?.id,item)
                // navigation?.navigate('ChatScreen')
              }}
            />

          </View>
        </View>
      )
    }

    return <FlatList
      data={delegates}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />

  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS?.white, flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader

        leftIcon={I18nManager?.isRTL ? icons?.LArrow : icons?.RArrow}
        delivery={icons?.createOrder}
        leftIconAction={() => {
          navigation?.goBack()
        }}
        title={t('common:den')}
      />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
        }}
      >

        {offersView()}
        <Spinner
          style={{
            alignSelf: 'center',
            marginTop: 112,

          }}
          color={COLORS?.primary}
          isVisible={loading}
          // size={this.state.size} 
          type={'WanderingCubes'}
        />
        <Text style={{
          ...FONTS?.h2,
          color: COLORS?.appBlack,
          fontSize: 16,
          marginVertical: 16,
          textAlign: 'center'
        }}>
          {t('common:wfo')}
        </Text>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ItemView: {
    padding: 16,
    backgroundColor: COLORS?.gray,
    borderRadius: 6,
    marginTop: 16
  },
  delegateImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor:COLORS?.gray1
    
  },
  delegatetxt: {
    ...FONTS?.h2,
    fontSize: 16,
    alignSelf: 'center'
  },
  icon: {
    width: 10,
    height: 10,
    tintColor: COLORS?.gray1,
    marginRight: 8
  },
  smalltxt: {
    ...FONTS?.h2,
    fontSize: 14,
    alignSelf: 'center'
  },
  txt: {
    ...FONTS?.h3,
    marginHorizontal: 5,
    alignSelf: 'center'
  }
})

export default ShowOffers;
