/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
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
  Pressable,
  I18nManager
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, icons, images, SIZES } from '../../../constants';
import MainInput from '../../comp/MainInput';
import MainButton from '../../comp/MainButton';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { gql, useMutation } from '@apollo/client';
import { LoginInterface } from './LoginInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_GQL } from '../../gql/mutation';



function JoinUsAsDriver() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const { t } = useTranslation();
  const route = useRoute()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState('')
  const [loginRequest, { data, loading, error, reset }] = useMutation(LOGIN_GQL);
  console.log({ data })
  console.log({ error })

  const [passwordError, setPasswordError] = useState("")
  const [validationMsg, setValidationMsg] = useState("")
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };

  useEffect(() => {
    if (error) {
      if (error?.graphQLErrors.length > 0) {
        let objType = typeof error?.graphQLErrors[0]?.extensions?.validation
        if (objType == 'object') {
          console.log(".....>", typeof error?.graphQLErrors[0]?.extensions?.validation)
          let [key, val] = Object.entries(error?.graphQLErrors[0]?.extensions?.validation)[0]
          console.log('val', val?.toString(), key)
          let msg = val?.toString()
          setValidationMsg(msg)
        } else {
          setValidationMsg(error?.message)

        }
      } else {
        setValidationMsg(error?.message)

      }
      // seterroMsg(val.messages)
    }

  }, [error])

  useEffect(() => {
    let e = route?.params?.phoneNumber || route?.params?.email
    console.log({ e })
    setEmail(e)
  }, [])

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
        <Pressable
          onPress={() => {
            setPassword('')
            setPasswordError('')
            navigation?.goBack()
          }}
        >
          <Image
            source={I18nManager.isRTL ? icons?.arback : icons?.back}
            style={{
              width: 40,
              height: 37,
              margin: 32
            }}
          />
        </Pressable>

        <ScrollView>
          <Image
            source={images?.logo}
            style={{
              ...styles?.logo,
              marginTop: 20
            }} />
          <Text


            style={{
              ...styles?.BoldPrimaryText,
              marginBottom: 46
            }}>
            {/* {`Welcome to makfy! \n Join us now`} */}
            {t('common:welcometxt')}
          </Text>

          <MainInput
            placeholder={t('common:Passwordhere')}
            onChange={(val) => {
              console.log(val)
              setPassword(val)
              setPasswordError('')
            }}
            style={{
              marginBottom: 24
            }}
            secureTextEntry={true}
            rightIcon={icons?.showpassword}
            err={passwordError}
          />
          {passwordError ? <Text
            style={{
              ...styles?.error

            }}
          >{passwordError}</Text> : null}
          {validationMsg ? <Text
            style={{
              ...styles?.error

            }}
          >{validationMsg}</Text> : null}
          <Pressable
            onPress={() => {
              setPassword('')
              navigation.navigate('ForgetPassword', {
                email
              })
            }}
            style={{
              ...styles?.forgetPasswordView
            }}
          >
            <Image source={icons?.forgetpassword} style={{ width: 24, height: 24 }} />
            <Text style={{ ...styles?.grayTxt }}>{t('common:Forgetpassword')}</Text>
          </Pressable>
          <MainButton
            disabled={loading}
            text={t('common:Signin')}
            style={{
              marginBottom: 147

            }}
            onPress={() => {
              console.log({ email })
              console.log({ password })
              if (email && password) {
                loginRequest({
                  variables: {
                    input: {
                      email,
                      password
                    }
                  },
                }).then(result => {
                  console.log({ result })
                  setPassword('')
                 if(result?.data?.login?.type == 1 ){
                  if (result?.data?.login?.token) {
                    console.log("result?.data?.login?.token", result?.data?.login?.token)
                    
                    AsyncStorage.multiSet([
                      ['token', result?.data?.login?.token],
                      ['userType','driver'],
                    ],
                      
                      () => {
                     
                          navigation.navigate('DriverHome')

                      })
                  } else {
                    setPasswordError(t('common:incorrectData'))

                  }}else{
                    setPasswordError(t('common:incorrectData'))
                  }

                });
              } else {
                setPasswordError(t('common:enterPassword'))
              }

            }}
          />

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}



export default JoinUsAsDriver;
