
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
  Pressable
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS, icons } from '../../constants';
import MainInput from '../comp/MainInput';
import MainButton from '../comp/MainButton';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import MainHeader from '../comp/MainHeader';
import { useTranslation } from 'react-i18next';
import { clearAsnc, CreateOrder, EstimateDeliveryPrice, ValidateUserOnCoupon } from './services/services';
import { useMutation, useQuery } from '@apollo/client';
import { me } from '../Account/services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';



function DeliverDetails(props) {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const isfocus = useIsFocused()

  const route = useRoute()
  const { t } = useTranslation();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const [details, setDetails] = useState('')
  const [detailsError, setdetailsError] = useState('')
  const [addNewComment, setAddNewcomment] = useState(false)

  const [coupon, setCoupon] = useState('')
  const [couponMSG, setCouponMSG] = useState('')
  const [couponStatus, setCouponStatus] = useState('')

  const [pickUpAddress, setPickUpAddress] = useState(t('common:Deliverfrom'))
  const [deliverTo, setDeliverTo] = useState(t('common:Deliverto'))
  const [deliveryPrice, setDeliveryPrice] = useState(0)

  const [PickupError, setPickupError] = useState('')
  const [DeliverError, setDeliverError] = useState('')

  const [fulldeliveAddress, setFulldeliveAddress] = useState('')
  const [fullPickUpAddress, setFullPickUpAddress] = useState('')
  // .................................quary................................
  const { data, loading, refetch } = useQuery(me); //execute query
  // ............................mutation..................................
  const [CreateOrderRequest,
    { data: createOrderData,
      error: createOrderError }] = useMutation(CreateOrder);

  const [validateUserOnCouponRequest,
    { data: validateUserOnCouponData,
      error: validateUserOnCouponError }] = useMutation(ValidateUserOnCoupon);

  const [EstimateDeliveryPriceRequest,
    { data: estimateDeliveryPriceData,
      error: estimateDeliveryPriceError }] = useMutation(EstimateDeliveryPrice);
  // ..........................useEffect................................................
  useEffect(() => {
    getLocations()
  }, [isfocus])

  useEffect(() => {
    if (fullPickUpAddress && fulldeliveAddress) {
      estimatePriceFun()
    }
  }, [fullPickUpAddress, fulldeliveAddress])
  // ...............................................................................
  const getLocations = () => {
    AsyncStorage.getItem('pickUpFrom').then(res => {
      if (res) {
        let r = JSON?.parse(res)
        console.log({ r })
        setFullPickUpAddress(r)
        setPickUpAddress(r?.from_address)
        setDetails(r?.details)
      }
    })
    AsyncStorage.getItem('deliveTo').then(res => {
      console.log({ res })
      if (res) {
        let r = JSON?.parse(res)
        console.log({ r })
        setFulldeliveAddress(r)
        setDeliverTo(r?.to_address)
        setDetails(r?.details)

      }
    })
  }
  const estimatePriceFun = () => {
    let obj = {
      "from_latitude": fullPickUpAddress?.from_latitude,
      "from_longitude": fullPickUpAddress?.from_longitude,
      "to_latitude": fulldeliveAddress?.to_latitude,
      "to_longitude": fulldeliveAddress?.to_longitude,
    }
    console.log("estimatePriceFun", obj)

    if (fullPickUpAddress?.from_latitude != undefined &&
      fulldeliveAddress?.to_latitude !== undefined) {
      console.log("estimatePriceFun", obj)

      EstimateDeliveryPriceRequest({
        variables: {
          input: obj
        },
      }).then(result => {
        console.log({ result })
        setDeliveryPrice(result?.data?.estimateDeliveryPrice)

      });
      console.log({ estimateDeliveryPriceError })

    }
  }
  const createOrderFun = () => {
    let obj = {
      "name": data?.me?.name,
      "email": data?.me?.email,
      "mobile": data?.me?.mobile,
      "details": details,
      "from_address": fullPickUpAddress?.from_address,
      "from_latitude": fullPickUpAddress?.from_latitude,
      "from_longitude": fullPickUpAddress?.from_longitude,
      "to_address": fulldeliveAddress?.to_address,
      "to_latitude": fulldeliveAddress?.to_latitude,
      "to_longitude": fulldeliveAddress?.to_longitude,
    }
    if (details == '') {
      setdetailsError(t('common:pleaseEnterDetails'))
    }
    if (fullPickUpAddress?.from_address == null ||
      fullPickUpAddress?.from_address == undefined) {
      setPickupError(t('common:pickupError'))
    }
    if (fulldeliveAddress?.to_address == null ||
      fulldeliveAddress?.to_address == undefined) {
      setDeliverError(t('common:deliverError'))
    }
    if (fulldeliveAddress?.to_address && fulldeliveAddress?.to_address && details) {
      console.log({ obj })

      CreateOrderRequest({
        variables: {
          input: obj
        },
      }).then(result => {
        console.log({ result })
        navigation.navigate('WaitingOffers', {
          data: {
            locationTo: fulldeliveAddress,
            locationFrom: fullPickUpAddress,
            deliveryPrice,
            orderDetails: result?.data
          }
        })
      });
    }
  }


  return (
    <SafeAreaView style={{ backgroundColor: COLORS?.white, flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader
        leftIcon={I18nManager?.isRTL ? icons.LArrow : icons?.RArrow}
        delivery={icons?.createOrder}
        leftIconAction={async () => {
          clearAsnc().then(res => {
            if (res) {
              navigation?.goBack()
            }
          })
        }}
        title={t('common:den')}
      />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24
        }}
      >
        <Text style={{
          ...styles?.txt
        }}>
          {t('common:Orderdetails')}
        </Text>
        <MainInput
          style={{
            ...styles?.input
          }}
          placeholder={t('common:itemsPlaceholder')}
          onChange={(val) => {
            setDetails(val)
            setdetailsError('')
          }}
          value={details}
        />

        {detailsError ?
          <Text
            style={{
              ...styles?.error
            }}>
            {detailsError}
          </Text>
          : null}
        {addNewComment && <MainInput
          style={{
            ...styles?.input
          }}
          placeholder={t('common:itemsPlaceholder')}
          onChange={(val) => {
            setDetails(val)
            setdetailsError('')
          }}
          value={details}
        />}
        {addNewComment == false && <Pressable
          onPress={() => {
            setAddNewcomment(true)
          }}
          style={{
            ...styles?.row,
            justifyContent: 'flex-end'
          }}>
          <Image
            style={{
              ...styles?.addIcon
            }} source={icons?.add} />
          <Text
            style={{
              ...styles?.addcommTxt
            }}
          >{t('common:addcomment')}</Text>
        </Pressable>}
        <Text
          style={{
            ...styles?.deladdress
          }}>
          {t('common:Deliveryaddress')}
        </Text>
        <View
          style={{
            ...styles?.grayView
          }}
        >
          <View style={{ ...styles?.row }}>
            <Image
              style={{
                ...styles?.icon
              }}
              source={icons?.locationcircle} />
            <Text
              style={{
                ...styles?.smalltxt
              }}
            >{pickUpAddress}</Text>
          </View>
          <Text
            onPress={() => {
              navigation?.navigate('ChoooseAddress', {
                btnLabel: t('common:Deliverfrom'),
                type: 'from',
                details
              })
            }}
            style={{
              ...styles?.addcommTxt,
              marginHorizontal: 40,
            }}
          >{t('common:cpl')}</Text>

        </View>
        {PickupError ?
          <Text
            style={{
              ...styles?.error
            }}>
            {PickupError}
          </Text>
          : null}
        <View
          style={{
            ...styles?.grayView
          }}
        >
          <View style={{ ...styles?.row }}>
            <Image
              style={{
                ...styles?.icon
              }}
              source={icons?.locationcircle} />
            <Text
              style={{
                ...styles?.smalltxt
              }}
            >{deliverTo}</Text>
          </View>
          <Text
            onPress={() => {
              navigation?.navigate('ChoooseAddress', {
                btnLabel: t('common:Deliverto'),
                type: 'to',
                details
              })
            }}
            style={{
              ...styles?.addcommTxt,
              marginHorizontal: 40,
            }}
          >{t('common:cdl')}</Text>

        </View>
        {DeliverError ?
          <Text
            style={{
              ...styles?.error
            }}>
            {DeliverError}
          </Text>
          : null}

        <Text style={{
          ...styles?.txt
        }}>
          {t('common:Paymentmethod')}
        </Text>
        <Pressable
          style={{
            ...styles?.grayView
          }}
        >
          <View style={{ ...styles?.row }}>
            <Image
              style={{
                ...styles?.icon
              }}
              source={icons?.wallet} />
            <Text
              style={{
                ...styles?.smalltxt,
                alignSelf: 'center'
              }}
            >{t('common:cashondelivery')}</Text>
          </View>
        </Pressable>

        <Pressable
          style={{
            ...styles?.grayView
          }}
        >
          <View style={{ ...styles?.row }}>
            <Image
              style={{
                ...styles?.icon
              }}
              source={icons?.wallet} />
            <Text
              style={{
                ...styles?.smalltxt,
                alignSelf: 'center'
              }}
            >{t('common:Creditcard')}</Text>
          </View>
        </Pressable>

        <Text style={{
          ...styles?.txt
        }}>
          {t('common:Promocode')}
        </Text>
        <View style={{ ...styles?.row }}>
          <MainInput
            style={{
              width: "75%"
            }}
            placeholder={t('common:Enterpromocode')}
            onChange={(val) => {
              setCoupon(val)
              setCouponMSG('')
              setCouponStatus('')
            }}
            value={coupon}
          />
          <MainButton
            style={{
              width: '25%'
            }}
            text={t('common:done')}
            onPress={() => {
              validateUserOnCouponRequest({
                variables: {
                  input: {
                    coupon_code: coupon
                  }
                },
              }).then(result => {
                console.log({ result })
                setCouponStatus(result?.data?.validateUserOnCoupon?.status)
                setCouponMSG(result?.data?.validateUserOnCoupon?.message)
              });
            }}
          />
        </View>
        {couponMSG ?
          <Text
            style={{
              ...styles?.error,
              color: couponStatus == 'FAILED' ? COLORS?.red : COLORS?.primary
            }}>
            {couponMSG}
          </Text>
          : null}
        <Text style={{
          ...styles?.txt,
          color: COLORS?.primary,
          marginVertical: 16,
        }}>
          {t('common:edc')}
        </Text>
        <View
          style={{
            ...styles?.waitOfferView
          }}
        >
          <Text style={{
            ...FONTS?.h2,
            color: COLORS?.appBlack
          }}>
            {deliveryPrice}  {t('common:SAR')}
          </Text>
        </View>
        <MainButton
          style={{
            marginVertical: 16,
            width: '100%'
          }}
          text={t('common:order')}
          onPress={() => {
            clearAsnc()
            createOrderFun()
          }}
          Textstyle={{
            alignSelf: 'center'
          }}
        />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txt: {
    ...FONTS?.h2,
    color: COLORS?.appBlack,
    fontSize: 16,
    marginTop: 40,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    marginTop: 16
  },
  addIcon: {
    tintColor: COLORS?.primary,
    width: 19,
    height: 19
  },
  addcommTxt: {
    ...FONTS?.h3,
    color: COLORS?.primary,
    fontSize: 16
  },
  deladdress: {
    ...FONTS?.h2,
    color: COLORS?.appBlack,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  grayView: {
    backgroundColor: COLORS?.gray,
    borderRadius: 6,
    padding: 10,
    marginVertical: 8
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8
  },
  waitOfferView: {
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
  smalltxt: {
    ...FONTS?.body3,
    color: COLORS?.gray1,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  error: {
    ...FONTS?.body5,
    color: COLORS?.red,
    marginVertical: 8
  }

})

export default DeliverDetails;
