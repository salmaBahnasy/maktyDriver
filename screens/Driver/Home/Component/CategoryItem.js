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
import Moment from 'moment';




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
            source={icons?.user}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{ ...FONTS?.h3 ,alignSelf:'flex-start'}}
            >{props?.item?.name}</Text>
            {/* <View style={{
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
            </View> */}

          </View>

          <View style={{padding:SIZES?.smallpading}}>
            <Text style={{
              ...FONTS?.body3,
              color: COLORS?.txtgray,
              // alignSelf:'flex-start'
            }}>{t('common:dt')}</Text>
            <Text
              style={{
                ...FONTS?.h3,
                marginVertical: 9,
              }}
            >
              {/* {props?.item?.created_at} */}
              {Moment(props?.item?.created_at).format('d MMM hh:mm')}
            </Text>
          </View>

        </View>
        <Text style={{
          ...FONTS?.body3,
          color: COLORS.txtgray,
          fontSize: 16,
          textAlign: 'center',
          marginTop: 14

        }}>
          {props?.item?.details}
        </Text>
        <View style={{
          ...styles?.row,
          alignSelf:'flex-end',
          }}>
        <Text style={{
          ...FONTS?.body3,
          color: COLORS.gray1,
          fontSize: 16,
          marginTop: 14

        }}>
          {t('common:price')} : 
        </Text>
        <Text style={{
          ...FONTS?.h4,
          color: COLORS.black,
          fontSize: 16,
          marginTop: 14,
          marginHorizontal:5

        }}>
           {props?.item?.delivery_cost} {t('common:SAR')}
        </Text>
        </View>
       
        <View
          style={{
            ...styles?.row,
            justifyContent: 'space-around',
            marginTop: 15,
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
