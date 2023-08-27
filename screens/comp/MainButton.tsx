/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
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
import { COLORS, icons, SIZES } from '../../constants';




function MainButton(props: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Pressable
      style={{
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor:props?.disabled?COLORS?.gray: COLORS?.primary,
        height: 56,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        ...props?.style
      }}
      onPress={() => {
        props?.onPress()
      }}
      disabled={props?.disabled?props?.disabled:false}
    >
      {
        props?.icon && <Image
          source={props?.icon}
          style={{
            width: 24,
            height: 24
          }}
        />
      }
      <Text style={{
        color:props?.disabled?COLORS?.gray1: COLORS?.white, 
        textAlign: 'center',

        fontFamily: 'Tajawal-Bold'
        , fontSize: 16,
        ...props?.Textstyle
      }}>{props.text}</Text>
    </Pressable>
  );
}



export default MainButton;
