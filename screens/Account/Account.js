/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  ScrollView,
  Platform
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, icons } from '../../constants';
import { StackActions, useNavigation } from '@react-navigation/native';
import MainHeader from '../comp/MainHeader';
import AccountOptions from '../comp/AccountOptions';
import ChangeLanguageBottomView from '../comp/ChangeLanguageBottomView';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';
import LogoutView from '../comp/LogoutView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from '../../constants/constVariable';



function Account() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const [changLang, setchangLang] = useState(false)
  const [logout, setLogout] = useState(false)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const { t } = useTranslation();

  const shareOptions = {
    message: 'makfy App',
    url: 'https://google.com',
  };




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS?.white }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader
        title={t('common:Myaccount')}
        rightIcon={icons?.circleBack}
        rightIconAction={() => {
          setLogout(!logout)
        }}
      />
      <ChangeLanguageBottomView
        isVisible={changLang}
        onDismiss={(val) => {
          setchangLang(val)
        }}

      />
      <LogoutView
        isVisible={logout}
        onDismiss={(val) => {
          setLogout(val)
        }}
        logoutAction={async () => {
          setLogout(false)
          await AsyncStorage.removeItem('token')
          await AsyncStorage.removeItem('userType')

          client.resetStore();
          Platform.OS=='ios'?
          navigation.navigate('Login'):
          navigation.dispatch(
            StackActions.replace('Login', {
            })
          );

        }}
        image={icons?.logout}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 10 }} />

        <AccountOptions
          icon={icons?.user}
          title={t('common:Myaccount')}
          onPress={() => {
            navigation.navigate('EditAccountData')
          }}

        />
        <AccountOptions
          icon={icons?.addraess}
          title={t('common:Myaddresses')}
          onPress={() => {
            navigation.navigate('Address')
          }}
        />
        <AccountOptions
          icon={icons?.aboutus}
          title={t('common:Aboutus')}
          onPress={() => {
            navigation.navigate('AboutUS')
          }}
        />
        <AccountOptions
          icon={icons?.lng}
          title={t('common:language')}
          onPress={() => {
            setchangLang(true)
          }}
        />
        <AccountOptions
          icon={icons?.terms}
          title={t('common:Termsconditions')}
          onPress={() => {
            navigation.navigate('Terms')
          }}
        />
        <AccountOptions
          icon={icons?.qestions}
          title={t('common:commonQestion')}
          onPress={() => {
            navigation.navigate('CommonQesttions')
          }}
        />
        <AccountOptions
          icon={icons?.contactUs}
          title={t('common:Contactus')}
          onPress={() => {
            navigation.navigate('ContactUs')
          }}
        />
        <AccountOptions
          icon={icons?.share}
          title={t('common:Shareapp')}
          onPress={() => {

            Share.open(shareOptions)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                err && console.log(err);
              });
          }}

        />
      </ScrollView>
    </SafeAreaView>
  );
}



export default Account;
