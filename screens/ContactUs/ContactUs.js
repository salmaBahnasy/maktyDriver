/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Pressable,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Linking,
  Platform,
  I18nManager
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, icons, images } from '../../constants';
import MainInput from '../comp/MainInput';
import MainButton from '../comp/MainButton';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../comp/MainHeader';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { ABOUTUS_GQL, SENDFEEDBACK_GQL, sendWhatsApp } from './services/services';
import { useMutation, useQuery } from '@apollo/client/react';
import { countryCode, countryCodeEgypt } from '../../constants/constVariable';
import FeedBackBottomView from '../comp/FeedBackBottomView';



function ContactUs() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const { t } = useTranslation();
  const [sendFeebBackRequest, { data, loading, error, reset }] = useMutation(SENDFEEDBACK_GQL);
  const queryResult = useQuery(ABOUTUS_GQL); //execute query
  // { data, loading,error }
  console.log({ data })
  console.log({ loading })
  console.log({ error })
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [message, setMessage] = useState('')
  // error
  const [nameErr, setNameErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [mobileErr, setMobileErr] = useState('')
  const [messageErr, setMessageErr] = useState('')
  // end

  const [validationMsg, setValidationMsg] = useState("")
  const [feedBack, setFeedBack] = useState(false)
  const [feedBackMsg, setFeedBackMsg] = useState('')

  console.log({ queryResult })
  useEffect(() => {
    if (error) {
      if (error?.graphQLErrors.length > 0) {
        let objType = typeof error?.graphQLErrors[0]?.extensions?.validation
        if (objType == 'object') {
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
    }

  }, [error])
  // share message to whatsapp to a specific predefined number independent to platform


  function socialIcons(icon, link, type) {
    return (
      <Pressable
        onPress={() => {
          if (type == 'phone') {
            sendWhatsApp(link)
          } else {
            Linking.openURL(link)
            // Linking.canOpenURL(link).then(supported => {
            //   console.log(supported)
            //   if (supported) {
            //     Linking.openURL(link)

            //   } else {
            //     console.log('Don\'t know how to open URI: ' + link);
            //   }
            // });
          }
        }}
      >
        <Image
          source={icon}
          style={{
            ...styles?.socialIcon
          }}
        />
      </Pressable>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS?.darkgray }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader
        title={t('common:contactUS')}
        leftIcon={I18nManager?.isRTL?icons?.LArrow:icons?.RArrow}

        leftIconAction={() => { navigation.goBack() }}
        style={{
          backgroundColor: COLORS?.darkgray
        }}
      />
      <FeedBackBottomView
        isVisible={feedBack}
        onDismiss={(val) => {
          setFeedBack(val)
        }}
        image={images?.editaccount}
        header={feedBackMsg}
        btntext={t('common:ok')}
        feedBackAction={() => {
          navigation.goBack()
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            ...styles?.mainView
          }}
        >
          <Text style={{ ...styles?.label }}>
            {t('common:enterName')}
          </Text>
          <MainInput
            placeholder={t('common:nameHere')}
            onChange={(val) => {
              setName(val)
              setNameErr('')
            }}
            err={nameErr}
          />
          <Text style={{ ...styles?.label }}>
            {t('common:enterEmail')}
          </Text>
          <MainInput
            placeholder={t('common:Emailhere')}
            onChange={(val) => {
              setEmail(val)
              setEmailErr('')
            }}
            err={emailErr}
          />
          <Text style={{ ...styles?.label }}>
            {t('common:enterphone2')}
          </Text>
          <MainInput
            placeholder={t('common:phoneher')}
            onChange={(val) => {
              setMobile(val)
              setMobileErr('')
            }}
            err={mobileErr}
            keyboardType={'numeric'}
            type={'phone'}
            countryCode={countryCode}

          />
          <Text style={{ ...styles?.label }}>

            {t('common:enote')}
          </Text>
          <MainInput
            err={messageErr}
            placeholder={t('common:noteHere')}
            multiline={true}
            textInputStyle={{
              height: 104,
              textAlignVertical: 'top',
              paddingTop:15
            }}
            style={{
              height: 104,
              marginBottom: 23
            }}
            onChange={(val) => {
              setMessage(val)
              setMessageErr('')
            }}
          />
          {validationMsg ?
            <Text>{validationMsg}</Text>
            : null}
          <MainButton
            text={t('common:Send')}
            Textstyle={{
              fontWeight: 'normal'
            }}
            disabled={loading}
            onPress={() => {
              if (name == '') {
                setNameErr(t('common:enterName'))
              }
              if (email == '') {
                setEmailErr(t('common:enterEmail'))

              }
              if (mobile == '') {
                setMobileErr(t('common:enterphone2'))

              }
              if (message == '') {
                setMessageErr(t('common:enote'))

              }
              if (name && email && mobile && message) {
                let feedBackData = {
                  name,
                  email,
                  mobile: `${countryCode}${mobile}`,
                  message,
                }
                console.log({feedBackData})
                sendFeebBackRequest({
                  variables: {
                    input: feedBackData
                  },
                }).then(result => {
                  console.log({ result })
                  setFeedBack(true)  
                  setFeedBackMsg(result?.data?.sendFeedback?.message)
                                 
                  // if (result?.data?.sendFeedback?.status == "SUCCESS") {

                  // }


                });
              }

            }}
          />
        </View>

        <View style={{
          ...styles?.contactUs
        }}>
          <Text style={{ ...styles?.txt }}>Or contact us</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {socialIcons(icons?.twitter, queryResult?.data?.aboutUs?.twitter)}
            {socialIcons(icons?.insta, queryResult?.data?.aboutUs?.instagram)}
            {socialIcons(icons?.facebook, queryResult?.data?.aboutUs?.facebook)}
            {socialIcons(icons?.whatsup, queryResult?.data?.aboutUs?.phone, 'phone')}

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



export default ContactUs;
