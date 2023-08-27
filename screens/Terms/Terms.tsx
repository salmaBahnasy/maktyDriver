/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{useState,useEffect}from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Pressable,
  Image,
  Text,
  View,
  ActivityIndicator,
  I18nManager
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import MainInput from '../comp/MainInput';
import MainButton from '../comp/MainButton';
import { useNavigation } from '@react-navigation/native';
import Selector from '../../Localization/LanguageSelector';
import MainHeader from '../comp/MainHeader';
import AccountOptions from '../comp/AccountOptions';
import { useQuery } from '@apollo/client';
import { ABOUTUS_GQL } from './services/services';



function Terms(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const { data, loading,error } = useQuery(ABOUTUS_GQL); //execute query
  const [terms, setTerms]  = useState('')
  console.log({ data })
  console.log(loading)
  console.log({error})

  useEffect(() => {
    if (!loading) {
      setTerms(data?.aboutUs?.terms_condition)
    }

  }, [data, loading])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS?.darkgray }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader
        title={'Terms & conditions'}
        leftIcon={I18nManager?.isRTL?icons?.LArrow:icons?.RArrow}
        leftIconAction={() => { navigation.goBack() }}
        style={{
          backgroundColor: COLORS?.darkgray
        }}
      />

      <View
        style={{
          backgroundColor: COLORS?.white,
          borderRadius: 19,
          margin: 22,
          padding: 24
        }}
      >
       {loading?
        <ActivityIndicator
        size={'small'}
        color={COLORS?.appyellow}
        style={{
          alignSelf:'center'
        }}
        />
       : <Text
          style={{
            ...FONTS?.body2,
            color: COLORS?.black,
            fontSize: 14,
            alignSelf:'flex-start'

          }}
        >
          {terms}
        </Text>}
      </View>


    </SafeAreaView>
  );
}



export default Terms;
