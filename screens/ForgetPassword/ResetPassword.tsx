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
import { FORGETPASSWORD_GQL, RESETPASSWORD_GQL } from './services/Services';
import FeedBackBottomView from '../comp/FeedBackBottomView';



function ResetPassword(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const route = useRoute()

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const { t } = useTranslation();
  const [code, setcode] = useState('')
  const [countDown, setcountDown] = useState()

  const [ResetPasswordRequest, { data, loading, error, reset }] = useMutation(RESETPASSWORD_GQL);
  console.log({ data })
  console.log({ loading })
  console.log({ error })
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")

  const [passwordErr, setPasswordErr] = useState("")
  const [password_confirmationErr, setPassword_confirmationErr] = useState("")
  const [validationMsg, setValidationMsg] = useState("")
  const [feedBack, setFeedBack] = useState(false)

  useEffect(() => {
    if (error) {
      if (error?.graphQLErrors.length > 0) {
        // console.log(".....>", typeof error?.graphQLErrors[0]?.extensions?.validation)
        let objType = typeof error?.graphQLErrors[0]?.extensions?.validation
        console.log({ objType })
        if (objType == 'object') {
          let [key, val] = Object?.entries(error?.graphQLErrors[0]?.extensions?.validation)[0]
          console.log('val', val?.toString(), key)
          let msg = val?.toString()
          setValidationMsg(msg)

        }else{
          setValidationMsg(error?.message)

        }

      } else {
        setValidationMsg(error?.message)
      }
    }

  }, [error])

  useEffect(() => {
    let e = route?.params?.email
    let c = route?.params?.code
    setEmail(e)
    setcode(c)
    console.log("e,c", e, c)
  }, [])

  const checkValidation = () => {
    if (password == undefined || password == '') {
      setPasswordErr(t('common:enterPassword'))
    }
    if (password_confirmation == undefined || password_confirmation == '') {
      setPassword_confirmationErr(t('common:enterPassword'))
    }
    if (password_confirmation !== '') {
      setPassword_confirmationErr(t('common:notIdentical'))
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
        <FeedBackBottomView
          isVisible={feedBack}
          onDismiss={(val: any) => {
            setFeedBack(val)
          }}
          image={images?.changPass}
          header={t('common:changepassSucc')}
          desc={t('common:changeDataSuccDesc')}
          btntext={t('common:ok')}
          feedBackAction={() => {
            navigation.navigate("JoinUs", {
              email
            })
          }}
        />
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

            <MainInput
              placeholder={t('common:Passworhere')}
              onChange={(val: any) => {
                console.log(val)
                setPassword(val)
                setPasswordErr('')
              }}
              style={{
                marginBottom: 16
              }}
              secureTextEntry={true}
              rightIcon={icons?.showpassword}
              err={passwordErr}
              type='password'

            />
            {passwordErr ? <Text
              style={{
                ...styles?.error

              }}
            >{passwordErr}</Text> : null}
            <MainInput
              placeholder={t('common:Passworhere')}
              onChange={(val: any) => {
                console.log(val)
                setPassword_confirmation(val)
                setPassword_confirmationErr('')
              }}
              style={{
                marginBottom: 16
              }}
              secureTextEntry={true}
              rightIcon={icons?.showpassword}
              err={password_confirmationErr}
              type='password'

            />
            {password_confirmationErr ? <Text
              style={{
                ...styles?.error
              }}
            >{password_confirmationErr}</Text> : null}


            <MainButton
              disabled={loading}
              text={t('common:save')}
              style={{
                marginBottom: 32

              }}
              onPress={() => {
                if (code && email && password && password_confirmation) {
                  ResetPasswordRequest({
                    variables: {
                      input: {
                        code,
                        email,
                        password,
                        password_confirmation
                      }
                    }
                  }).then(result => {
                    console.log({ result })
                    setFeedBack(true)
                  });
                } else {
                  checkValidation()
                }

              }}
            />

          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView >
  );
}



export default ResetPassword;
