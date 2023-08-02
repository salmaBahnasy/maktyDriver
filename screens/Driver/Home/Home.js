
import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable,
  ImageBackground,
  ScrollView,
  FlatList,
  I18nManager
} from 'react-native';
import { io } from "socket.io-client";
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import GetDeleveryAddressModal from '../../comp/GetDeleveryAddressModal';
import styles from './styles';
import { me } from '../Account/services/services';
import MainWallet from '../../comp/MainWallet';
import CategoryItem from './Component/CategoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectToSocket } from '../../../constants/SocketConfig';
import NewOrderRequest from '../../comp/NewOrderRequest';
import { socket } from '../../../constants/constVariable';
import { ConfirmDelegateOrder } from './services/services';




function HomeDriver() {
  const { t } = useTranslation();
  const route = useRoute()
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const isfocus = useIsFocused()
  const [socketState, setsocketState] = useState({})
  const { data, loading } = useQuery(me); //execute query
  const [showDeliveryAddress, setshowDeliveryAddress] = useState(false)
  const [Token, setToken] = useState('')
  const [newReqestModal, setnewReqestModal] = useState(false)
  const [orderData, setOrderData] = useState([])
  const [AcceptDelegateOrderRequest,
    { data: acceptDelegateOrderData,
      error: acceptDelegateOrderError }] = useMutation(ConfirmDelegateOrder);
  console.log({ acceptDelegateOrderData })
  console.log({ acceptDelegateOrderError })
  const { data: userData, loading: userLoading, refetch } = useQuery(me); //execute query
  console.log({ data })

  useEffect(() => {
    connectTOSocket()
  }, [])

  const ConfirmDelegateOrderfnc = (item) => {
    console.log("route", route?.params.data)
    let obj = {
      order_id: JSON.parse(item?.id),
      delegate_id: JSON.parse(userData?.me?.id)
    }
    console.log('ConfirmDelegateOrderfnc', obj)
    AcceptDelegateOrderRequest({
      variables: {
        input: obj
      },
    }
    ).then(result => {
      console.log({ result })
      // navigation?.navigate('ChatScreen', {
      //   data: route?.params?.data,
      //   delegateData: item
      // })

    })
  }
  const connectTOSocket = async () => {
    console.log('socket.....', socket)
    AsyncStorage.getItem('token').then(token => {
      console.log({ token })
      if (socket.connected == true) {
        console.log("null")
      } else {
        console.log("waiting for connection....")
        socket.auth.token = token;
        // socket.disconnect().connect();
        console.log('socket.....', socket)

        socket.on("connect", () => {
          console.log("connect", socket.id); // x8WIv7-mJelg7on_ALbx
          listentoNewOrder()
          listentoAcceptOrder()
        });
        socket.on("disconnect", () => {
          console.log("disconnect", socket); // undefined
        });
        socket.on("connect_error", () => {
          socket.auth.token = token;
          console.log("connect_error", socket); // undefined
          socket.disconnect().connect();
          // socket.connect();

        });
        socket.connect()
      }
    })
  }
  // ..................................................................
  // render category item view
  const renderItem = ({ item, index }) => {
    return <Pressable
      key={'drivercat' + index}
      onPress={() => {
        index % 3 == 0 ?
          navigation.navigate('Categories')
          :
          navigation.navigate('Offers')
      }}
      style={{
        ...styles?.catItem
      }}
    >
      <Text style={{
        ...styles?.catItemTitle
      }}>Past
        orders</Text>
      <Image
        source={index % 3 == 0 ? icons?.bag :
          icons?.discount}
        style={{
          ...styles?.catItemImage
        }}
      />
    </Pressable>

  }
  const listentoAcceptOrder = () => {
    console.log('listentoAcceptOrder')
    socket.on("OrderAccept", (args) => {
      // ...
      console.log(args)

    });
  }

  const listentoNewOrder = () => {
    console.log('listentoNewOrder')
    socket.on("NewOrder", (args) => {
      // ...

      console.log({ args })
      console.log({ orderData })
      setTimeout(() => {
        setnewReqestModal(true)
        setOrderData([args])
      }, 1000);
    });
  }
  const disconnect = async () => {
    console.log({ socket })
    setsocketState(socket)
    socket.removeAllListeners("NewOrder");
    // for all events
    socket.removeAllListeners();
    socket.disconnect == true ? null
      : console.log('disconnect---->')
    socket.disconnect()
    socket.on("disconnect", () => {
      console.log(socket); // undefined
    });
    socket.close()
  }


  // .......................................................................
  function _renderSocket() {
    return (
      <View style={{ ...styles?.row, justifyContent: 'space-around' }}>
        <Pressable
          onPress={() => {
            connectTOSocket()
          }}
          style={{
            backgroundColor: COLORS?.bgGreen,
            padding: SIZES.padding
          }}
        >
          <Text>connect socket</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            disconnect()
          }}
          style={{
            backgroundColor: COLORS?.red,
            padding: SIZES.padding

          }}
        >
          <Text>disconnect socket</Text>
        </Pressable>
      </View>
    )
  }
  console.log({ orderData })

  return (
    <SafeAreaView style={{ backgroundColor: COLORS?.white, flex: 1 }}>
      <StatusBar
        barStyle={'default'}
        backgroundColor={COLORS?.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <GetDeleveryAddressModal
          isVisible={showDeliveryAddress}
          onDismiss={(val) => {
            setshowDeliveryAddress(val)
          }}
          action={() => {
            navigation?.navigate('ChoooseAddress')

          }}
        />
        <NewOrderRequest
          isVisible={newReqestModal}
          orderData={orderData}
          onDismiss={() => {
            setnewReqestModal(false)
          }}
          ConfirmDelegateOrderfnc={(item) => {
            setnewReqestModal(false)
            ConfirmDelegateOrderfnc(item)
          }}
        />
        {/* ...... */}
        <ImageBackground
          source={images?.rectangle}
          style={{
            ...styles?.homeheader
          }}>
          <View style={{ ...styles?.row, paddingHorizontal: 24 }}>
            <Image
              source={images.user}
              style={{
                width: 53,
                height: 53,
                resizeMode: 'contain',
                borderRadius: 26.5,
                marginRight: 16
              }}
            />
            <View>
              <Text
                style={{
                  ...FONTS?.body2,
                  fontSize: 14,
                  textTransform: 'uppercase',
                  color: COLORS?.white
                }}
              >
                {`${t("common:hello")} ${data?.me?.name}`}
              </Text>
              <Text
                style={{
                  ...FONTS?.h3,
                  fontSize: 16,
                  textTransform: 'uppercase',
                  color: COLORS?.white,
                  alignSelf: 'flex-start'

                }}
              >
                {t('common:readyfororder')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 23, marginTop: 8
                }}
              >
                <Image
                  source={icons.location}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: COLORS?.yellow
                  }}
                />
                <Text
                  style={{
                    ...FONTS?.h2,
                    fontSize: 14,
                    textTransform: 'uppercase',
                    color: COLORS?.yellow,

                  }}

                >Riyadh</Text>
              </View>
            </View>

          </View>

        </ImageBackground>
        {/* <_renderSocket /> */}
        <View style={{ marginVertical: 16 }}>
          <MainWallet />
          <Pressable
            onPress={() => { navigation.navigate('Wallet') }}
            style={{ ...styles?.row, paddingHorizontal: 16 }}>
            <Text style={{ ...FONTS?.h3, color: COLORS?.primary }}>{t('common:gotowallet')}</Text>
            <Image
              source={I18nManager?.isRTL ? icons?.RArrow : icons?.LArrow}
              style={{
                width: 14,
                height: 14,
                tintColor: COLORS?.primary,
                marginBottom: SIZES?.smallpading
              }}
            />
          </Pressable>
        </View>
        <View style={{
          ...styles?.row,
          backgroundColor: COLORS?.gray,
          marginHorizontal: 16,
          borderRadius: 8, padding: 24,
          justifyContent: 'space-between'
        }}>
          <Image source={icons?.ordersno}
            style={{
              width: 26,
              height: 26,
              resizeMode: 'contain',
              alignSelf: 'center'
            }}
          />
          <Text style={{ ...FONTS?.body3, lineHeight: 24, marginVertical: 4 }}>
            {t('common:noo')}
          </Text>
          <Text style={{ ...FONTS?.h3, textAlign: 'center', color: COLORS?.primary }}>
            15
            <Text
              style={{ ...FONTS?.body3, color: COLORS.txtgray }}
            > {t('common:order')}</Text>
          </Text>
        </View>

        <Pressable
          onPress={() => { navigation.navigate('Orders') }}
          style={{ ...styles?.row, paddingHorizontal: 16, marginTop: 16 }}>
          <Text style={{ ...FONTS?.h3, color: COLORS?.primary }}>{t('common:Gotoorders')}</Text>
          <Image
            source={I18nManager?.isRTL ? icons?.RArrow : icons?.LArrow}
            style={{
              width: 14,
              height: 14,
              tintColor: COLORS?.primary,
              marginBottom: SIZES?.smallpading
            }}
          />
        </Pressable>
        <FlatList
          data={[]}
          renderItem={(item, index) => { return <CategoryItem /> }}
          style={{
            ...styles?.catflatList
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        {/* {
          _renderSocket()
        } */}

      </ScrollView>
    </SafeAreaView>
  );

}



export default HomeDriver;
