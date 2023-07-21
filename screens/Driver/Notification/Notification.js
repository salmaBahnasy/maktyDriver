/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Pressable,
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  I18nManager
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import MainInput from '../../comp/MainInput';
import MainButton from '../../comp/MainButton';
import { useNavigation } from '@react-navigation/native';
import Selector from '../../../Localization/LanguageSelector';
import MainHeader from '../../comp/MainHeader';
import AccountOptions from '../../comp/AccountOptions';
import { useTranslation } from 'react-i18next';
import { useQuery } from "@apollo/client";


function DriverNotification() {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();


  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };

  function ListNotView() {
    const renderItem = ({ item, index }) => {
      console.log("renderItem----->", item)
      return <View style={{
        ...styles?.cartView
      }}>
        <Text
          numberOfLines={2}
          style={{
            ...FONTS?.body2,
            alignSelf:'flex-start',
            textAlign:'left',
            color: COLORS?.appBlack,
            fontSize: 16
          }}
        >
          Notifications content will be here.Notifications content will be here.
        </Text>
        <View style={{ ...styles?.row }}>
          <Image
            source={icons?.clock}
            style={{
              ...styles?.xIcon
            }} />
          <Text
            style={{ ...styles?.txt }}
          >35 min ago</Text>
        </View>

      </View>
    }

    return <FlatList
      data={[1, 1, 1, 1]}
      renderItem={renderItem}
    />
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS?.white
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader
        title={t('common:note')}
        leftIcon={I18nManager?.isRTL?icons?.LArrow:icons?.RArrow}

        leftIconAction={() => { navigation.goBack() }}
      />
      {
        ListNotView()
      }


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  xIcon: {
    width: 16,
    height: 16
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
  }
})

export default DriverNotification;
