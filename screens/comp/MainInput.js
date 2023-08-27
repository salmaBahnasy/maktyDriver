/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  useColorScheme,
  View,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Pressable,
  I18nManager
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLORS, FONTS, SIZES } from '../../constants';


// android:windowSoftInputMode="adjustResize"


function MainInput(props) {
  const { i18n } = useTranslation();

  console.log(i18n.language=='ar',i18n.language)
  const isDarkMode = useColorScheme() === 'dark';
  const [showpassword, setShowPassword] = useState(props?.secureTextEntry)
  return (

    <View
      style={{
        ...styles?.container,
        borderWidth: props?.err != '' && props?.err ? 1 : 0,
        borderColor: props?.err != '' && props?.err ? COLORS?.red : COLORS?.gray,
        backgroundColor: props?.type == 'phone' ? " transparent " : COLORS?.gray,
        ...props?.style

      }}
    >
      {
        props?.leftIcon ?
          <Image
            source={props?.leftIcon}
            style={{ ...styles?.img }} />
          : null
      }
      {
        props?.type == 'phone' &&
        <View
          style={{
            backgroundColor: COLORS?.gray,
            height: 50,
            borderRadius: 7,
            marginRight: 8,
            marginLeft: -8,
            justifyContent: 'center',
            width: 40

          }}
        >
          <Text style={{
            color: COLORS?.black,
            textAlign: 'center'


          }}>{props?.countryCode}</Text>
        </View>
      }
      <TextInput
        keyboardType={props?.keyboardType ? props?.keyboardType :'default'}
        textContentType={props?.keyboardType=='email-address'?"emailAddress":'none'}
        style={[props?.type == 'phone' ? {
          ...FONTS?.body3,
          backgroundColor: COLORS?.gray,
          width: '90%',
          borderRadius: 7,
          color: COLORS?.black,
          paddingHorizontal: 15,
          height:50,
          textAlign:'left',
          ...props?.textInputStyle
        } : {
          ...FONTS?.body3,
          width: '90%',
          color: COLORS?.black,
          textAlign:i18n.language=='ar'?'right':'left',
          ...props?.textInputStyle
        }]}
        placeholder={props?.placeholder}
        placeholderTextColor={COLORS?.gray1}
        onChangeText={(val) => {
          console.log({ val })
          props?.onChange(val)
        }}
        secureTextEntry={showpassword}
        multiline={props?.multiline ? props?.multiline : false}
        value={props?.value}
        onFocus={()=>{
          props?.onFocus?props?.onFocus(true):null
        }}
        onBlur={()=>{
          props?.onFocus?props?.onFocus(false):null

        }}
      />
      {
        props?.rightIcon ?
          <Pressable
            onPress={() => {
              setShowPassword(!showpassword)
            }}
            // onPressIn={() => {
            //   setShowPassword(false)
            // }}
            // onPressOut={()=>{
            //   setShowPassword(true)
            // }}
            style={{
              position: 'absolute', 
              right:i18n.language=='ar'?5: 15,
              // left:i18n.language=='ar'?15:5
            }}
          >
            <Image
              source={props?.rightIcon}
              style={{ ...styles?.img, }} />
          </Pressable>
          : null
      }
    </View>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  container: {
    backgroundColor: COLORS?.gray,
    width: '90%',
    alignSelf: 'center',
    height: 56,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES?.base,
  }
})

export default MainInput;
