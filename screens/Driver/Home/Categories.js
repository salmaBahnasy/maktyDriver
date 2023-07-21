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
  Text,
  useColorScheme,
  View,
  Image,
  FlatList,
  I18nManager
} from 'react-native';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { me } from '../../Account/services/services';
import MainHeader from '../../comp/MainHeader';
import styles from './styles';
import CategoryItem from './Component/CategoryItem';




function DriverCategories() {

  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const { t } = useTranslation();
  const { data, loading } = useQuery(me); //execute query
  // render category item view
  const renderItem = ({ item, index }) => {
    // // return null
    // function btns(img, txt) {
    //   return (
    //     <View style={{ justifyContent: 'center' }}>
    //       <Image source={img}
    //         style={{
    //           width: 22,
    //           height: 22,
    //           alignSelf: 'center'
    //         }}
    //       />
    //       <Text
    //         style={{
    //           ...FONTS?.h3,
    //           color: COLORS?.primary,
    //           marginTop: 9,
    //           textAlign: 'center'
    //         }}
    //       >{txt}</Text>
    //     </View>
    //   )
    // }
    // return (
    //   <View style={{
    //     ...styles?.catItem2
    //   }}>
    //     <View style={{ ...styles?.row }}>
    //       <Image
    //         style={{
    //           ...styles?.circleimg
    //         }}
    //         source={images?.kfc}
    //       />
    //       <View style={{ flex: 1 }}>
    //         <Text
    //           style={{ ...FONTS?.h3 }}
    //         >Resturant name</Text>
    //         <View style={{
    //           ...styles?.row, marginVertical: 9
    //         }}>
    //           <Image source={icons?.clock} style={{ ...styles?.icon }} />
    //           <Text style={{
    //             ...FONTS?.body4,
    //             color: COLORS?.txtgray,
    //             marginHorizontal: 8,

    //           }}>1 min</Text>
    //         </View>

    //       </View>

    //       <View>
    //         <Text style={{
    //           ...FONTS?.body3,
    //           color: COLORS?.txtgray,
    //         }}>Delivery time</Text>
    //         <Text
    //           style={{
    //             ...FONTS?.h3,
    //             marginVertical: 9,
    //           }}
    //         >Within 1 hour</Text>
    //       </View>

    //     </View>
    //     <Text style={{
    //       ...FONTS?.body3,
    //       color: COLORS.txtgray,
    //       fontSize: 16,
    //       textAlign: 'center',
    //       marginTop: 14

    //     }}>
    //       -1
    //       سندوتش مايتي زينجر كبير وبطاطس وكولا
    //     </Text>
    //     <View
    //       style={{
    //         ...styles?.row,
    //         justifyContent: 'space-around',
    //         marginTop: 35
    //       }}
    //     >
    //       {btns(icons?.you, t('common:Delivery'))}
    //       <Text style={{...FONTS?.body3}}>2.5 km</Text>
    //       {btns(icons?.pickUp, t('common:Pickup'))}

    //       <Text style={{...FONTS?.body3}}>2.5 km</Text>

    //       {btns(icons?.delivery, t('common:Delivery'))}

    //     </View>

    //   </View>
    // )

    // return <CategoryItem/>
  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS?.white, flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={COLORS?.primary} />
      <MainHeader
        leftIcon={I18nManager?.isRTL ? icons?.LArrow : icons?.RArrow}
        title={t('common:cat')}
        leftIconAction={() => { navigation.goBack() }}
      />
      {/* category......> */}
      <View style={{
        ...styles?.catheaderview
      }}>
        <Text
          style={{
            ...styles?.cattext
          }}
        >Category name (30)</Text>

      </View>
      <FlatList
        data={[1, 2, 2, 1, 2, 2, 2, 2]}
        renderItem={(item,index)=>{return <CategoryItem/>}}
        style={{
          ...styles?.catflatList
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );

}



export default DriverCategories;
