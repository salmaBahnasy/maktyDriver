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
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';




function MainHeader(props: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ImageBackground
      source={images?.rectangle}
      style={{
        width: '100%',
        height: 106,
        backgroundColor: COLORS?.white,
        ...props?.style
      }}>
      <View style={{
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40
      }}>
        <Pressable
          onPress={() => {
            props?.leftIconAction ? props?.leftIconAction() : null
          }}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          {props?.leftIcon && <Image
            source={props?.leftIcon}
            style={{
              width: 24,
              height: 22.6,
              marginRight: 8.3,
              resizeMode: 'contain',
              ...props?.img
            }} />}
          {props?.delivery && <Image
            source={props?.delivery &&props?.stringURL? { uri: props?.delivery } :props?.delivery }
            style={{
              width: 53,
              height: 53,
              marginRight: 8.3,
              resizeMode: 'contain',
              ...props?.secondimg
            }} />}
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                ...FONTS?.body3,
                color: COLORS?.white,
                fontSize: 16
              }}
            >{props?.title}</Text>
            {props?.subtitle && <Text
              style={{
                ...FONTS?.body3,
                color: COLORS?.white,
                fontSize: 16,
                marginTop: 8
              }}
            >{props?.subtitle}</Text>}
          </View>
        </Pressable>
        {props?.rightIcon &&
          <Pressable
            onPress={() => {
              props?.rightIconAction()

            }}
          >
            <Image
              source={props?.rightIcon}
              style={{
                height: 25,
                width: 24
              }}
            />
          </Pressable>
        }
      </View>
    </ImageBackground>
  );
}



export default MainHeader;
