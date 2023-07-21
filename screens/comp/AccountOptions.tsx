/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
 Image,
  Text,
  useColorScheme,
  View,
  TextInput,
  Pressable
} from 'react-native';
import { COLORS, SIZES } from '../../constants';




function AccountOptions(props: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Pressable
      style={{
        marginHorizontal: 17,
        height: 56,
        backgroundColor: COLORS?.bggray,
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center',
        borderRadius:8,
        marginVertical:4,
        ...props?.style

      }}
      onPress={()=>{
        props?.onPress()
      }}
    >
      <Image
        source={props?.icon}
        style={{
          width: 24,
          height: 24,
          marginHorizontal:24
        }}
      />
      <Text
      style={{
        color:COLORS?.black,
        fontSize:16,
        fontFamily:'Tajawal-Bold'
      }}
      >{props?.title}</Text>

    </Pressable>
  );
}



export default AccountOptions;
