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
  Image,
  KeyboardAvoidingView
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, icons, images, SIZES } from '../../constants';
import MainInput from '../comp/MainInput';
import MainButton from '../comp/MainButton';
import { useNavigation } from '@react-navigation/native';



function CreateOrders(){
  const isDarkMode = useColorScheme() === 'dark';
const navigation=useNavigation()
const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

    </SafeAreaView>
  );
}



export default CreateOrders;
