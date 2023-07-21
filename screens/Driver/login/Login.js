

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
  KeyboardAvoidingView
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS, images, SIZES } from "../../../constants";
import MainInput from '../../comp/MainInput';
import MainButton from '../../comp/MainButton';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';



function LoginDriver(props){
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const { t } = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')

  // ..........................................................
useEffect(()=>{
setPhoneNumber('')
setPhoneNumberError('')
},[props])




  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ImageBackground
        source={images?.login}
        style={{
          ...styles?.imageContainer
        }}
      >
        <KeyboardAvoidingView behavior='padding'>
        <ScrollView>
          <Image
            source={images?.logo}
            style={{
              ...styles?.logo
            }} />
          <Text
            style={{
              ...styles?.BoldPrimaryText,
              marginBottom: 46
            }}>
            {/* {`Welcome to makfy! \n Join us now`} */}
            {t('common:welcometxtDriver')}
          </Text>

          <MainInput
            placeholder={t('common:Emailhere')}
            onChange={(val) => {
              console.log({val})
              if (val?.length > 5) {
                setPhoneNumber(val)
              }
              setPhoneNumberError('')

            }}
            style={{
              marginBottom: 24
            }}
            err={phoneNumberError}
            keyboardType={'email-address'}
          />
          {phoneNumberError && phoneNumberError!='' ? <Text
            style={{
              ...styles?.error

            }}
          >{phoneNumberError}</Text> : null}
          <MainButton
            text={t('common:Joinnow')}
            onPress={() => {
              console.log({ phoneNumber })
              if (phoneNumber == '') {
                setPhoneNumberError(t('common:enterPhoneNumberOrEmail'))
              } else {
                let email=phoneNumber
                setPhoneNumber('')
                setPhoneNumberError('')
                navigation.navigate('JoinUsAsDriver', {
                  phoneNumber:email
                })

              }

            }} />
          <View
            style={{
              ...styles?.signUpView
            }}
          >
            <Text style={{ ...styles?.grayTxt }}>{t('common:donthaveaccount')}</Text>
            <Text
              onPress={() => {
                setPhoneNumber('')
                setPhoneNumberError('')
                navigation.navigate('SignUpForDriver') }}
              style={{
                ...styles?.BoldPrimaryTextSmall,
                marginHorizontal: SIZES.base,
              }}>{t('common:signup')}</Text>

          </View>
          {/* <View>
            <Text 
            onPress={()=>{
              AsyncStorage.setItem('userType',"user",()=>{
                navigation.navigate('Login')
              })
            }}
            style={{
              ...styles?.BoldPrimaryTextSmall,
              textAlign: 'center',
              marginBottom: 57
            }}>
              {t('common:asclient')}
            </Text>
          </View> */}
        </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}



export default LoginDriver;
