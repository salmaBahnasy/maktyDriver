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
  StyleSheet,
  I18nManager
} from 'react-native';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../../comp/MainHeader';
import { useTranslation } from 'react-i18next';
import WalletFilteration from '../../comp/WalletFilteration';
import TopUpWalletFilteration from '../../comp/TopUpWalletFilteration';
import DatePickerModal from '../../comp/DatePickerModal';


function Wallet() {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();
  const [showSort, setshowSort] = useState(false)
  const [showTopUp, setshowTopUp] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const navigation = useNavigation()

  function ListNotView() {
    const renderItem = ({ item, index }) => {
      return <View style={{
        ...styles?.cartView
      }}>

        <View style={{ ...styles?.row }}>
          <Image
            source={icons?.mto}
            style={{
              ...styles?.xIcon
            }} />
          <Text
            style={{
              ...FONTS?.h3,
              marginLeft: 16
            }}
          >
            100  <Text
              style={{ ...FONTS?.body5 }}
            >
              {t('common:SAR')}
            </Text>
          </Text>
        </View>
        <Text
          style={{ ...styles?.txt, marginLeft: 28 }}
        >
          Sunday, 17/03/2023 3:00PM
        </Text>
      </View>
    }

    return <FlatList
      data={[1, 1, 1, 1]}
      renderItem={renderItem}
      ListHeaderComponent={() => {
        return (
          <View style={{
            ...styles?.row,
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
            marginVertical: 16
          }}>
            <Text
              style={{
                ...FONTS?.h2,
                color: COLORS?.black
              }}
            >{t('common:Mytransactions')}</Text>
            <Pressable
              onPress={() => {
                setshowSort(!showSort)
              }}
              style={{
                backgroundColor: COLORS?.primary,
                width: 32,
                height: 32,
                borderRadius: 8,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                source={icons?.sort}
                style={{
                  width: 24,
                  height: 24,
                  alignSelf: 'center'
                }}
              />
            </Pressable>
          </View>
        )
      }}
    />
  }
  function _cardView() {
    return (
      <View
        style={{
          ...styles?.grayView,
          ...styles?.row
        }}
      >
        <View
          style={{
            flex: 1,
            ...styles?.row
          }}>
          <Image
            source={icons?.wallet}
            style={{
              ...styles?.icon
            }}
          />
          <View style={{ marginHorizontal: 16 }}>
            <Text
              style={{ ...FONTS?.body3 }}
            >{t('common:Remaining')}</Text>
            <Text
              style={{ ...FONTS?.h3, flex: 1 }}
            >
              100  <Text
                style={{ ...FONTS?.body5 }}
              >
                {t('common:SAR')}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ ...styles?.divider }} />

        <View
          style={{ flex: 1 }}
        >

          <View
            style={{ ...styles?.row }}
          >
            <Text
              style={{ ...FONTS?.body3, flex: 3 }}
            >
              {t('common:Totalpaid')}
            </Text>

            <Text
              style={{ ...FONTS?.h3, flex: 2 }}
            >
              100  <Text
                style={{ ...FONTS?.body5 }}
              >
                {t('common:SAR')}
              </Text>
            </Text>
          </View>
          <View
            style={{ ...styles?.row }}
          >
            <Text
              style={{ ...FONTS?.body3, flex: 3 }}
            >
              {t('common:Used')}
            </Text>

            <Text
              style={{ ...FONTS?.h3, flex: 2 }}
            >
              100  <Text
                style={{ ...FONTS?.body5 }}
              >
                {t('common:SAR')}
              </Text>
            </Text>

          </View>
        </View>
      </View>
    )
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date1) => {
    console.log("A date has been picked: ", date1.toISOString().slice(0, 10));
    let format = date1.toISOString().slice(0, 10)
    // setBirth_date(format)
    hideDatePicker();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS?.white
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'light-content'}
      />
      <MainHeader
        title={t('common:Mywallet')}
        leftIcon={I18nManager?.isRTL ? icons?.LArrow : icons?.RArrow}
        leftIconAction={() => { navigation.goBack() }}
      />
      <WalletFilteration
        isVisible={showSort}
        onDismiss={(val) => {
          setshowSort(val)
        }}
        showDatePicker={() => {
          showDatePicker()
          setshowSort(false)

        }}
      />
      <DatePickerModal
        isDatePickerVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
      />
      <TopUpWalletFilteration
        isVisible={showTopUp}
        onDismiss={(val) => {
          setshowTopUp(val)
        }}
        showDatePicker={() => {
          showDatePicker()
          setshowTopUp(false)
        }}
      />
      {_cardView()}
      <Pressable
        style={{
          ...styles?.btn
        }}
        onPress={() => {
          setshowTopUp(!showTopUp)
        }}
      >
        <Text
          style={{ ...FONTS?.h3 }}
        >{t('common:topwallet')}</Text>

      </Pressable>
      {
        ListNotView()
      }


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  xIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain'
  },
  cartView: {
    backgroundColor: COLORS?.noteBg,
    marginHorizontal: 14,
    marginVertical: 4,
    borderRadius: 10,
    padding: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txt: {
    color: COLORS?.txtgray,
    fontSize: 16,
    marginHorizontal: 8
  },
  divider: {
    width: 1,
    height: 59,
    backgroundColor: COLORS?.gray1,
    borderRadius: 2,
    marginRight: 28
  },
  icon: {
    width: 37,
    height: 37
  },
  grayView: {
    backgroundColor: COLORS?.gray,
    height: 89,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 13,
    marginVertical: 20,
  },
  btn: {
    backgroundColor: COLORS?.btnY,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 56
  }
})

export default Wallet;
