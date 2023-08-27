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
  Platform,
  Image,
  Text
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS, icons } from '../../../constants';
import { StackActions, useNavigation } from '@react-navigation/native';
import MainHeader from '../../comp/MainHeader';
import AccountOptions from '../../comp/AccountOptions';
import ChangeLanguageBottomView from '../../comp/ChangeLanguageBottomView';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';
import LogoutView from '../../comp/LogoutView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from '../../../constants/constVariable';
import styles from './styles';



function DriverAccount() {
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
          client.resetStore();
          Platform.OS == 'ios' ?
            navigation.navigate('LoginDriver') :
            navigation.dispatch(
              StackActions.replace('LoginDriver', {
              })
            );

        }}
        image={icons?.logout}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={{ height: 10 }} /> */}
        <View
          style={{
            backgroundColor: COLORS?.bggray,
            height: 121,
            borderRadius: 8,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 20,
            justifyContent: 'space-around',
            ...styles.row
          }}
        >
          <View>
            <Image source={icons?.wallet}
              style={{
                ...styles?.icon,
                alignSelf: 'center'
              }}
            />
            <Text style={{
              ...FONTS?.body3,
              lineHeight: 24,
              marginVertical: 4
            }}>
              {t('common:Accountbalance')}
            </Text>
            <Text style={{
              ...FONTS?.h3,
              textAlign: 'center',
              color: COLORS?.primary
            }}>
              100
              <Text
                style={{
                  ...FONTS?.body3,
                  color: COLORS.txtgray
                }}
              > sar</Text>
            </Text>
          </View>
          <View>
            <Image source={icons?.noo}
              style={{
                ...styles?.icon,
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
              > order</Text>
            </Text>
          </View>
        </View>
        <AccountOptions
          icon={icons?.user}
          title={t('common:Myaccount')}
          onPress={() => {
            navigation.navigate('EditDriverAccountData')
          }}

        />
        <AccountOptions
          icon={icons?.wallet}
          title={t('common:Mywallet')}
          onPress={() => {
            navigation.navigate('Wallet')
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



export default DriverAccount;
