import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable,KeyboardAvoidingView ,ScrollView} from 'react-native';
import Modal from "react-native-modal";
import { COLORS, icons, SIZES } from '../../constants';
import { useTranslation } from 'react-i18next';
import MainInput from './MainInput';
import MainButton from './MainButton';


const ChangePasswordBottomView = (props) => {
  const { t } = useTranslation();
  const [onfocus, setonfucs] = useState(false)
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')
  // error
  const [passwordErr, setPasswordErr] = useState('')
  const [oldPasswordErr, setOldPasswordErr] = useState('')
  const [password_confirmationErr, setPassword_confirmationErr] = useState('')



  const inputValidation = () => {
    if (oldPassword == '') {
      setOldPasswordErr(t('common:enterPassword'))
    }
    if (password == '') {
      setPasswordErr(t('common:enterPassword'))
    }
    if (password_confirmation=='') {
      setPassword_confirmationErr(t('common:enterPassword'))
    }
    if (password_confirmation!==password) {
      setPassword_confirmationErr(t('common:enterPassword'))
      setPasswordErr(t('common:enterPassword'))

    }
  }
  // renders
  return (
    <Modal
      isVisible={props?.isVisible}
      onDismiss={() => {
        props?.onDismiss(false)
      }}
      onBackButtonPress={() => {
        props?.onDismiss(false)
      }}
      style={{
        width: SIZES.width,
        alignSelf: 'center'
      }}
    >
           {/* <KeyboardAvoidingView  style={{flex:1}} behavior='padding'> */}
      <View style={{
        ...styles?.mainView,
        bottom:onfocus?SIZES.height/3:0
      }}>
        <Text
          style={{
            ...styles?.changePasstext
          }}
        >
          {t('common:changPass')}
        </Text>
   

        <MainInput
          secureTextEntry={true}
          placeholder={t('common:Currentpassword')}
          rightIcon={icons?.eye}
          style={{
            marginVertical: 8,
            width: '100%'
          }}
          onChange={(val) => {
            setOldPassword(val)
          }}
          err={oldPasswordErr}
          onFocus={(val)=>{
            setonfucs(val)
          }}
        />
        <MainInput
          secureTextEntry={true}
          placeholder={t('common:newpassword')}
          rightIcon={icons?.eye}
          style={{
            marginVertical: 8,
            width: '100%'
          }}
          onChange={(val) => {
            setPassword(val)
          }}
          err={passwordErr}
          onFocus={(val)=>{
            setonfucs(val)
          }}
       />
        <MainInput
          secureTextEntry={true}
          placeholder={t('common:newpassword')}
          rightIcon={icons?.eye}
          style={{
            marginVertical: 8,
            width: '100%'
          }}
          onChange={(val) => {
            setPassword_confirmation(val)
          }}
          err={password_confirmationErr}
          onFocus={(val)=>{
            setonfucs(val)
          }}
        />

        <View
          style={{
            ...styles?.row
          }}

        >
          <MainButton
            text={t('common:saveChanges')}
            style={{
              width: '75%',
              marginRight: 24
            }}
            onPress={() => {
              inputValidation()
              if (oldPassword && password && password_confirmation &&password_confirmation==password ) {
                setPasswordErr('')
                setOldPasswordErr('')
                setPassword_confirmationErr('')
                props?.saveChanges(oldPassword, password, password_confirmation)

              }
            }}
          />
          <Pressable
            onPress={() => {
              setPasswordErr('')
              setOldPasswordErr('')
              setPassword_confirmationErr('')
              props?.onDismiss(false)
            }}
          >
            <Text style={{ color: COLORS?.gray1 }}>{t('common:back')}</Text>
          </Pressable>

        </View>

      </View>
{/* </KeyboardAvoidingView> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  changePasstext: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 48,
    color: COLORS?.appBlack,
    marginBottom: 8,
    fontWeight: 'bold',

    fontFamily: 'Tajawal-Bold'
  },
  mainView: {
    backgroundColor: COLORS?.white,
    bottom: 0,
    position: 'absolute',
    width: SIZES?.width,
    padding: 24
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30

  }
});

export default ChangePasswordBottomView;