
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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import GetDeleveryAddressModal from '../../comp/GetDeleveryAddressModal';
import styles from './styles';
import { me } from '../Account/services/services';
import { socket } from '../../../constants/constVariable';
import MainWallet from '../../comp/MainWallet';
import CategoryItem from './Component/CategoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectToSocket } from '../../../constants/SocketConfig';
import NewOrderRequest from '../../comp/NewOrderRequest';




function HomeDriver() {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const isfocus = useIsFocused()
  const [socketState, setsocketState] = useState({})
  const { data, loading } = useQuery(me); //execute query
  const [showDeliveryAddress, setshowDeliveryAddress] = useState(false)
  const [Token, setToken] = useState('')
  const [newReqestModal, setnewReqestModal] = useState(false)
  const [Requestes, setRequestes] = useState([])

  useEffect(() => {
    () => {
      AsyncStorage.getItem('token').then(token => {
        setToken(token)
      })
    }
  }, [])
  useEffect(() => {
    useSocket()
  }, [Token])

  const useSocket = () => {
    // Call connectToSocket and use the socket instance
    connectToSocket()
      .then((socket) => {
        console.log('useSocket--->', socket)
        if (!socket.connected) {
          console.log("socket--^_^")
          // Use the socket instance and add event listeners or perform socket operations
          socket.on('connect', () => {
            console.log('Connected to server');
            console.log("connect", socket.id); // x8WIv7-mJelg7on_ALbx
            listentoNewOrder(socket)
          });
          socket.on('disconnect', () => {
            console.log('Disconnected from server');
            console.log(socket.id);
          });

          socket.on("connect_error", () => {
            socket.auth.token = Token
            console.log("connect_error", socket); // undefined
          });
          socket.connect()
        } else {
          console.log('socket not found')
          listentoNewOrder(socket)
          disconnect(socket)
        }
      })
      .catch((error) => {
        console.log('Error connecting to socket:', error);
      });
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
  // const connectTOSocket = async () => {
  //   console.log('socket.....', socket)
  //   // AsyncStorage.getItem('token').then(token => {
  //   //   setToken(token)
  //   //   const socket = io("http://185.148.147.83:3002", {
  //   //     transports: ["websocket"],
  //   //     autoConnect: false,
  //   //     reconnection: false,
  //   //     auth: {
  //   //       // how to pass token here from AsyncStorage   
  //   //       token: token
  //   //     }
  //   //   });

  //     if (socket.connected == true) {
  //       console.log("null")
  //     } else {
  //       console.log("waiting for connection....")
  //       console.log('socket', socket)
  //       socket.on("connect", () => {

  //         console.log("connect", socket.id); // x8WIv7-mJelg7on_ALbx
  //         listentoNewOrder()

  //       });
  //       // socket.on("disconnect", () => {
  //       //   console.log(socket.id); // undefined
  //       // });
  //       socket.on("connect_error", () => {
  //         socket.auth.token=Token
  //         console.log("connect_error", socket); // undefined
  //       });
  //       socket.connect()
  //     }
  //   // })

  // }
  //   import {io} from "socket.io-client";

  // const socketDriver = io("http://185.148.147.83:3002",
  //     {
  //         transports: ["websocket"],
  //         reconnection: false,
  //         autoConnect: false,
  //         auth: {
  //             token: "150|eV4NAKRVIQ8H7TXiPFr3rUBYiWgiMsSnEFRWhIuH"
  //         }
  //     }
  // );

  // socketDriver.on("connect", () => {
  //     console.log(socketDriver.id);
  //     socketDriver.on("NewOrder",(data)=>{
  //         console.log(data)
  //     })
  //     socketDriver.on("disconnect", (reason, description) => {
  //         socketDriver.disconnect()
  //         console.log(socketDriver);

  //     });
  //     socketDriver.on("connect_error", (err) => {
  //         console.log(err);
  //     });
  // });


  // socketDriver.connect()
  const listentoNewOrder = (socket) => {
    console.log('listentoNewOrder')
    console.log('socket', socket)

    socket.on("NewOrder", (args) => {
      // ...
      setnewReqestModal(true)
      console.log({ args })
      setRequestes(args)
    });
  }
  const disconnect = async (socket) => {
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
            useSocket()
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
          data={Requestes}
          onDismiss={() => {
            setnewReqestModal(false)
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
        <_renderSocket />
        <View style={{ marginVertical: 16 }}>
          <MainWallet />
          <View style={{ ...styles?.row, paddingHorizontal: 16 }}>
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
          </View>
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

        <View style={{ ...styles?.row, paddingHorizontal: 16, marginTop: 16 }}>
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
        </View>
        <FlatList
          data={[1, 2]}
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
