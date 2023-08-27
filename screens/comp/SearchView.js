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
  TextInput,
  Pressable,
  Image
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import styles from './styles';
import MainInput from './MainInput';




function SearchView(props) {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();

  const _renderSearchView = () => {
    return (
      <View style={{
        ...styles?.searchView
      }}>
        <MainInput
          leftIcon={icons?.search}
          style={{
            ...styles?.searchInput
          }}
          textInputStyle={{
            ...styles?.searchtext
          }}
          placeholder={t('common:search')}
          onChange={(val) => {
              props?.onchangeText(val)
          }}
        />
        <Pressable
          style={{
            ...styles?.filterView
          }}
        >
          <Image
            source={icons.filter}
            style={{
              ...styles?.filterIcon
            }}
          />
        </Pressable>
      </View>
    )
  }
  return (
    <View>
      {_renderSearchView()}
    </View>
  );
}



export default SearchView;
