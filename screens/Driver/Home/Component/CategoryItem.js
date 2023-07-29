/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import { COLORS, FONTS, icons, images, SIZES } from '../../../../constants';
import styles from '../styles';
import { useTranslation } from 'react-i18next';




function CategoryItem(props) {
  const { t } = useTranslation();

  const renderItem = () => {
    // return null
    function btns(img, txt) {
      return (
        <View style={{ justifyContent: 'center' }}>
          <Image source={img}
            style={{
              width: 22,
              height: 22,
              alignSelf: 'center'
            }}
          />
          <Text
            style={{
              ...FONTS?.h3,
              color: COLORS?.primary,
              marginTop: 9,
              textAlign: 'center'
            }}
          >{txt}</Text>
        </View>
      )
    }
    return (
      <View style={{
        ...styles?.catItem2
      }}>
        <View style={{ ...styles?.row }}>
          <Image
            style={{
              ...styles?.circleimg
            }}
            source={images?.kfc}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{ ...FONTS?.h3 ,alignSelf:'flex-start'}}
            >Resturant name</Text>
            <View style={{
              ...styles?.row, marginVertical: 9
            }}>
              <Image source={icons?.clock} style={{ ...styles?.icon }} />
              <Text style={{
                ...FONTS?.body4,
                color: COLORS?.txtgray,
                marginHorizontal: 8,
                alignSelf:'flex-start',
                lineHeight:16,marginTop:5

              }}>1 min</Text>
            </View>

          </View>

          <View style={{padding:SIZES?.smallpading}}>
            <Text style={{
              ...FONTS?.body3,
              color: COLORS?.txtgray,
              // alignSelf:'flex-start'
            }}>Delivery time</Text>
            <Text
              style={{
                ...FONTS?.h3,
                marginVertical: 9,
              }}
            >Within 1 hour</Text>
          </View>

        </View>
        <Text style={{
          ...FONTS?.body3,
          color: COLORS.txtgray,
          fontSize: 16,
          textAlign: 'center',
          marginTop: 14

        }}>
          -1
          سندوتش مايتي زينجر كبير وبطاطس وكولا
        </Text>
        <View
          style={{
            ...styles?.row,
            justifyContent: 'space-around',
            marginTop: 25,
          }}
        >
          {btns(icons?.you, t('common:Delivery'))}
          <Text style={{ ...FONTS?.body3 ,lineHeight:22,marginBottom:15}}>2.5 km</Text>
          {btns(icons?.pickUp, t('common:Pickup'))}
          <Text style={{ ...FONTS?.body3,lineHeight:22 ,marginBottom:15}}>2.5 km</Text>
          {btns(icons?.delivery, t('common:Delivery'))}

        </View>

      </View>
    )
  }
  return (
    renderItem()
  );
}



export default CategoryItem;
