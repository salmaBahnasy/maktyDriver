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
import { COLORS, FONTS, SIZES } from '../../constants';




function EmptyView(props: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
   <View style={{padding:100}}>
    <Image
    source={props?.image}
    style={{
      width:SIZES?.width/3,
      height:SIZES?.width/3,
      alignSelf:'center',
      tintColor:COLORS?.appyellow,
      ...props?.imageStyle
    }}
    />
    {props?.msg&&<Text style={{...FONTS?.h3,color:COLORS?.gray1,textAlign:'center',marginTop:22}}>
      {props?.msg}
    </Text>}
   </View>
  );
}



export default EmptyView;
