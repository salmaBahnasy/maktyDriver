/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  PermissionsAndroid,
  Platform
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { images, SIZES } from '../constants';
import { StackActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



function Splash() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  useEffect(() => {
    requestUserPermission()
    redirect()
  }, [])


  const redirect = () => {
    AsyncStorage.getItem('token').then(token => {
      console.log({ token })
      if (token) {
        setTimeout(() => {
          navigation.dispatch(
            StackActions.replace('DriverHome', {
            })
          );
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.dispatch(
            StackActions.replace('LoginDriver', {
            })
          );
        }, 1000);
      }
    })
  }
  async function requestUserPermission() {

    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   console.log('Authorization status:', authStatus);
    // }
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
    // const fcmToken = await messaging().getToken();
    // console.log({ fcmToken })

    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
    await messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    Platform.OS == 'ios' && await messaging.registerDeviceForRemoteMessages();

    // let fcm = await messaging().getToken()
    // await AsyncStorage.setItem('fcm', fcm)
    // console.log({ fcm })

  }




  function saveFcmToken() {
    console.log('saveFcmToken');
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          messaging()
            .getToken()
            .then(fcmtoken => {
              if (fcmtoken) {
                console.log(fcmtoken, 'fcmtoken');
              }
            })
        } else {

          // user doesn't have a device token yet
        }
      });
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ImageBackground
        source={images.Splash}
        style={{
          width: SIZES.width,
          height: SIZES.height
        }}
      />
    </SafeAreaView>
  );
}



export default Splash;
