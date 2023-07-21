import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, I18nManager } from 'react-native';
import Modal from "react-native-modal";
import { COLORS, FONTS, SIZES } from '../../constants';
import MainButton from './MainButton';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';


const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'عربي' }
];

const LogoutView = (props: any) => {
  const { t } = useTranslation();

  const { i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const [restsrtApp, setRestartApp] = useState()
  const [currentLang, setcurrentLang] = useState(I18nManager.isRTL ? 'ar' : 'en')

  useEffect(() => {
    if (restsrtApp) {
      setTimeout(() => {
        RNRestart.Restart();
      }, 1000);
    }
  }, [restsrtApp])


  const setLanguage = code => {
    if (code === 'ar') {
      i18n.locale = 'ar';
      I18nManager.forceRTL(true)
      I18nManager.allowRTL(true)
      setRestartApp(true)

    } else {
      i18n.locale = 'en';
      I18nManager.forceRTL(false)
      I18nManager.allowRTL(false)
      setRestartApp(true)
    }
    return i18n.changeLanguage(code);
  };
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
      <View style={{
        backgroundColor: COLORS?.white,
        bottom: 0,
        position: 'absolute',
        width: SIZES?.width,
        padding: 24
      }}>
        <Image
          source={props?.image}
          style={{
            width: 142,
            height: 153
          }}
        />
        <Text
          style={{
            ...FONTS?.h2,
            fontSize: 24,
            lineHeight: 48,
            color: COLORS?.appBlack,
            marginBottom: 30,
            alignSelf: 'flex-start'
          }}
        >
          {t('common:logoutask')}
          {/* LogOut */}
        </Text>

        <MainButton
          style={{
            // backgroundColor: COLORS?.white,
          }}
          text={t('common:nostay')}
          Textstyle={{
            // color: COLORS?.gray1
          }}
          onPress={() => {
            props?.onDismiss(false)
            // props?.logoutAction()
          }}

        />
        <MainButton
          style={{
            backgroundColor: COLORS?.white,
          }}
          text={t('common:logout')}
          Textstyle={{
            color: COLORS?.gray1
          }}
          onPress={() => {
            // props?.onDismiss(false)
            props?.logoutAction()
          }}

        />
      </View>
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
});

export default LogoutView;