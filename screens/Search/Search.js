import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  I18nManager,
  FlatList,
  Image,
  View,
  Text,
  ImageBackground
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { COLORS, icons, images,FONTS } from '../../constants';
import MainHeader from '../comp/MainHeader';
import SearchView from '../comp/SearchView';
import styles from './styles';



function Search() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const { t } = useTranslation();

  const [searchtext, setSearchTxt] = useState('')

  // ....................rendreview..........................
  function searchResult() {
    const renderItem = ({ item, index }) => {
      return <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 16,
          backgroundColor: COLORS?.gray,
          borderRadius: 8,
          flexDirection:'row',
          alignItems:'center'
        }}
      >
        <ImageBackground
          source={images?.offerDefauteimage}
          style={{
            width: "auto",
            height: 139,
            justifyContent: 'flex-end'
          }}
          borderTopLeftRadius={8}
          borderBottomLeftRadius={8}
          borderBottomRightRadius={8}
          borderTopRightRadius={8}
        >
          <View
            style={{
              backgroundColor: COLORS?.white,
              borderRadius: 13,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 13,
              alignSelf: 'flex-start',
              paddingVertical: 4,
              marginHorizontal: 16,
              marginBottom: 10

            }}
          >
            <Image source={icons?.star} style={{ width: 16, height: 16 }} />
            <Text
              style={{
                ...FONTS?.h4
              }}
            >3.74</Text>

          </View>
        </ImageBackground>
        <View style={{ marginHorizontal: 16, marginBottom: 18 }}>
          <Text style={{
            ...FONTS?.h3,
            fontSize: 16,
            color: COLORS?.appBlack
          }}>Resturant name</Text>
          <Text style={{
            ...FONTS?.body3,
            color: COLORS?.gray1,
            fontSize: 16,
            marginHorizontal: 5
          }}>
            Category
          </Text>
          <View style={{ ...styles?.row }}>
            <Image
              style={{
                width: 18,
                height: 18,
                tintColor: COLORS?.gray1
              }}
              source={icons?.clock} />
            <Text style={{
              ...FONTS?.body3,
              color: COLORS?.gray1,
              fontSize: 16,
              marginHorizontal: 5
            }}>
              35 min
            </Text>
          </View>
        </View>
      </View>
    }

    return <FlatList
      data={[1]}
      renderItem={renderItem}
      ListEmptyComponent={() => {
        return (
          <Image
            source={images?.emptySearch}
            style={{
              ...styles?.emptyImage
            }}
          />
        )
      }}
    />
  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS?.white, flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
      />
      <MainHeader
        title={t('common:search')}
        leftIcon={I18nManager?.isRTL ? icons?.LArrow : icons?.RArrow}
        leftIconAction={() => { navigation.goBack() }}
      />
      <SearchView
        onchangeText={(val) => {
          setSearchTxt(val)
        }}
      />
      {searchResult()}
    </SafeAreaView>
  );
}



export default Search;
