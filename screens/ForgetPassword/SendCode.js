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
import OtpInputs from 'react-native-otp-inputs';

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
import { CONFIRMFORGETPASSWORD_GQL, FORGETPASSWORD_GQL } from './services/Services';



function SendCode(){
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const route = useRoute()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const { t } = useTranslation();
  const [code, setcode] = useState('')
  const [countDown, setcountDown] = useState()
  const [email, setEmail] = useState('')

  const [confirmforgetPasswordRequest, { data, loading, error, reset }] = useMutation(CONFIRMFORGETPASSWORD_GQL);
  console.log({ data })
  console.log({ loading })
  console.log({ error })

  const [codeError, setcodeError] = useState("")
  const [validationMsg, setValidationMsg] = useState("")
  const [forgetPasswordRequest] = useMutation(FORGETPASSWORD_GQL);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null)
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {

      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  useEffect(() => {
    if (error) {
      if (error?.graphQLErrors.length > 0) {
        console.log(".....>", typeof error?.graphQLErrors[0]?.extensions?.validation)
        let [key, val] = Object?.entries(error?.graphQLErrors[0]?.extensions?.validation)[0]
        console.log('val', val?.toString(), key)
        let msg = val?.toString()
        setValidationMsg(msg)
      } else {
        setValidationMsg(error?.message)

      }
      // seterroMsg(val.messages)
    }

  }, [error])

  useEffect(() => {
    let e = route?.params?.email
    console.log({ e })
    setEmail(e)
  }, [])

  const sentOTPAgain = () => {
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
        if (result?.data?.sendForgotPasswordCode?.status
          == "SUCCESS"
        ) {
          setTimeLeft(15)
        }
      });
    } else {
      // setEmailError(t('common:enteremail'))
    }

  }

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
        {/* <Pressable
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
        </Pressable> */}
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

          <ScrollView>
            <Image
              source={images?.logo}
              style={{
                ...styles?.logo,
                marginTop: 80
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
              {t('common:enterotp')}
            </Text>
            <View style={styles.otpView}>
              <OtpInputs
                handleChange={(code) => {
                  console.log(code)
                  setValidationMsg('')
                  setcode(code)
                }}
                numberOfInputs={6}
                inputStyles={{
                  ...styles?.otpInput
                }}
                // clearTextOnFocus
              />
            </View>


            {validationMsg ? <Text
              style={{
                ...styles?.error

              }}
            >{validationMsg}</Text> : null}
            <MainButton
              disabled={loading}
              text={t('common:activate')}
              style={{
                marginBottom: 32

              }}
              onPress={() => {
                console?.log(code,
                  email)
                if (code) {
                  confirmforgetPasswordRequest({
                    variables: {
                      input: {
                        code,
                        email
                      }
                    }
                  }).then(result => {
                    console.log({ result })
                    if (result?.data?.confirmForgotPasswordCode?.status == "SUCCESS") {
                      navigation.navigate('ResetPassword', {
                        result,
                        code,
                        email
                      })
                    }

                  });
                } else {
                  setValidationMsg(t('common:pleaseEnterOTP'))
                }
              }}
            />
            {

              timeLeft ?

                <View style={{ ...styles?.row, ...styles?.center }}>

                  <Text style={{ ...styles?.grayTxt }}>{t('common:tryAfter')}</Text>
                  <Text style={{
                    ...styles?.orangTxt, marginHorizontal: 8,
                  }}>{timeLeft}</Text>
                </View>
                : <Text
                  onPress={() => {
                    sentOTPAgain()
                  }}
                  style={{
                    ...styles?.orangTxt,
                    textAlign: 'center'
                  }}>{t('common:tryAgain')}</Text>


            }

          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView >
  );
}



export default SendCode;
