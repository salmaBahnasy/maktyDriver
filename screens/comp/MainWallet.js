/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Pressable,
  Image
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, FONTS, icons, SIZES } from '../../constants';





function MainWallet(props) {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();

  function _cardView() {
    return (
      <View
        style={{
          ...styles?.grayView,
          ...styles?.row
        }}
      >
        <View
          style={{
            flex: 1,
            ...styles?.row
          }}>
          <Image
            source={icons?.wallet}
            style={{
              ...styles?.icon
            }}
          />
          <View style={{ marginHorizontal: 16 }}>
            <Text
              style={{ ...FONTS?.body3 }}
            >{t('common:Remaining')}</Text>
            <Text
              style={{ ...FONTS?.h3, flex: 1 }}
            >
              100  <Text
                style={{ ...FONTS?.body5 }}
              >
                {t('common:SAR')}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ ...styles?.divider }} />

        <View
          style={{ flex: 1 }}
        >

          <View
            style={{ ...styles?.row }}
          >
            <Text
              style={{ ...FONTS?.body5,flex:3,alignSelf:'flex-start',textAlign:'left'}}
            >
              {t('common:Totalpaid')}
            </Text>

            <Text
              style={{ ...FONTS?.h3,flex:2}}
            >
              100  <Text
                style={{ ...FONTS?.body5 }}
              >
                {t('common:SAR')}
              </Text>
            </Text>
          </View>
          <View
            style={{ ...styles?.row,marginTop:SIZES?.base }}
          >
            <Text
              style={{ ...FONTS?.body5, flex: 3 ,alignSelf:'flex-start',textAlign:'left'}}
            >
              {t('common:Used')}
            </Text>

            <Text
              style={{ ...FONTS?.h3, flex: 2 }}
            >
              100  <Text
                style={{ ...FONTS?.body5 }}
              >
                {t('common:SAR')}
              </Text>
            </Text>

          </View>
        </View>
      </View>
    )
  }
  return (
    _cardView()
  );
}

const styles = StyleSheet.create({
  xIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain'
  },
  cartView: {
    backgroundColor: COLORS?.noteBg,
    marginHorizontal: 14,
    marginVertical: 4,
    borderRadius: 10,
    padding: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txt: {
    color: COLORS?.txtgray,
    fontSize: 16,
    marginHorizontal: 8
  },
  divider: {
    width: 1,
    height: 59,
    backgroundColor: COLORS?.gray1,
    borderRadius: 2,
    marginRight: 16
  },
  icon: {
    width: 37,
    height: 37
  },
  grayView: {
    backgroundColor: COLORS?.gray,
    height: 89,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 13,
    marginVertical: 20,
  },
  btn: {
    backgroundColor: COLORS?.btnY,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 56
  }
})

export default MainWallet;
