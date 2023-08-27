/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Pressable,
  Image,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  I18nManager

} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../comp/MainHeader';
import { useQuery } from '@apollo/client';
import { QUESTIONS_gql } from './services/services';
import { useTranslation } from 'react-i18next';
import EmptyView from '../comp/EmptyView';



function CommonQesttions() {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();

  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const [page, setpage] = useState(0)
  const [showDetails, setShowDetails] = useState(0)

  const queryReslut = useQuery(QUESTIONS_gql, {
    variables: { page, first: 12 },
  });
  console.log({ queryReslut })
  const renderItem = ({ item, index }) => {
    return <View
      style={{
        marginBottom: 8,
        borderRadius: 19,
        backgroundColor: COLORS?.white,
        marginHorizontal: 22,
        marginTop: index == 0 ? 22 : 0

      }}
    >
      {_head(item, index)}
      {showDetails == index ? _body(item, index) : null}
    </View>
  }
  const _body = (item, index) => {
    return <View
      style={{
        height: 95,
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderTopWidth: .5,
        borderColor: COLORS?.gray1
      }}


    >
      <Text style={{ ...FONTS?.body3, fontSize: 14, color: COLORS?.gray1, alignSelf: 'flex-start' }}>
        {item?.description}
      </Text>

    </View>
  }
  const _head = (item, index) => {
    return <Pressable
      style={{
        backgroundColor: COLORS?.white,
        height: 95,
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'

      }}
      onPress={() => {
        if (showDetails == index) {
          setShowDetails(null)
        } else {
          setShowDetails(index)
        }
      }}
    >
      <Text style={{ ...FONTS?.h3, fontSize: 16, color: COLORS?.appBlack }}>
        {item?.title}
      </Text>
      <Image
        source={showDetails == index ? icons?.uparrow : icons?.downarrow}
        style={[{
          //           position: 'absolute',
          // right:10,
          //           top: 22,
          width: 16,
          height: 10
        }, I18nManager?.isRTL && {
          left: 10
        },]}
      />
    </Pressable>
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS?.darkgray }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainHeader
        title={t('common:commonQestion')}
        leftIcon={I18nManager.isRTL ? icons?.LArrow : icons?.RArrow}
        leftIconAction={() => { navigation.goBack() }}
        style={{
          backgroundColor: COLORS?.darkgray
        }}
      />


      {queryReslut?.loading ?
        <ActivityIndicator
          size={'small'}
          style={{
            alignSelf: 'center',
            marginTop: 22
          }}
          color={COLORS?.appyellow}
        />
        : <FlatList
          data={queryReslut?.data?.questions?.data}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            return <EmptyView
              image={icons?.qestions}
              msg={t('common:noq')}
            />
          }}
        />}


    </SafeAreaView>
  );
}



export default CommonQesttions;
