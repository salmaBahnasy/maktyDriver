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
  Pressable
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, icons, images, SIZES } from '../../constants';
import MainInput from '../comp/MainInput';
import MainButton from '../comp/MainButton';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { gql, useMutation } from '@apollo/client';
import { FORGETPASSWORD_GQL } from './services/Services';



function ForgetPassword() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const { t } = useTranslation();
  const [email, setEmail] = useState('')
  const [forgetPasswordRequest, { data, loading, error, reset }] = useMutation(FORGETPASSWORD_GQL);
  console.log({ data })
  console.log({ loading })
  console.log({ error })

  const [emailError, setEmailError] = useState("")
  const [validationMsg, setValidationMsg] = useState("")


  useEffect(() => {
    if (error) {
      if(error?.graphQLErrors.length>0){
        console.log(".....>", typeof error?.graphQLErrors[0]?.extensions?.validation)
        let [key, val] = Object?.entries(error?.graphQLErrors[0]?.extensions?.validation)[0]
        console.log('val', val?.toString(), key)
        let msg = val?.toString()
        setValidationMsg(msg)
      }else{
        setValidationMsg(error?.message)
      }
     
      // seterroMsg(val.messages)
    }

  }, [error])

  useEffect(() => {
    // let e = route?.params?.phoneNumber
    // console.log({ e })
    // setEmail(e)
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
            navigation?.goBack()
          }}
        >
          <Image
            source={icons?.back}
            style={{
              width: 40,
              height: 37,
              margin: 32
            }}
          />
        </Pressable>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

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
              marginBottom: 24
            }}>
            {t('common:forgetPassDesc')}
          </Text>
          <Text
            style={{
              ...styles?.thinPrimaryText,
              marginBottom: 24
            }}>
            {t('common:enterEmail')}
          </Text>

          <MainInput
            placeholder={t('common:enterEmail')}
            onChange={(val) => {
              console.log(val)
              setEmail(val)
              setEmailError('')
            }}
            style={{
              marginBottom: 24
            }}
            err={emailError}
          />
          {emailError ? <Text
            style={{
              ...styles?.error

            }}
          >{emailError}</Text> : null}
          {validationMsg ? <Text
            style={{
              ...styles?.error

            }}
          >{validationMsg}</Text> : null}
          <MainButton
            disabled={loading}
            text={t('common:sendcode')}
            style={{
              marginBottom: 147

            }}
            onPress={() => {
              setValidationMsg('')
              if (email) {
                forgetPasswordRequest({
                  variables: {
                    input: {
                      email
                    }
                  },
                }).then(result => {
                  console.log({ result })
                  if(result?.data?.sendForgotPasswordCode?.status=="SUCCESS"){
                      navigation.navigate('SendCode',{
                        email
                      })
                  }

                });
              } else {
                setEmailError(t('common:enteremail'))
              }

            }}
          />

        </ScrollView>
        </KeyboardAvoidingView>

      </ImageBackground>
    </SafeAreaView>
  );
}



export default ForgetPassword;
