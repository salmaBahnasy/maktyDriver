import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Modal from "react-native-modal";
import { COLORS, FONTS, SIZES, images, icons } from '../../constants';
import MainButton from './MainButton';
import { useTranslation } from 'react-i18next';
import CategoryItem from '../Driver/Home/Component/CategoryItem';


const NewOrderRequest = (props) => {
  const { t } = useTranslation();

  function offersView() {

    const renderItem = ({ item, index }) => {
      return (
        <View
          style={{
            ...styles?.ItemView
          }}
        >
          <View style={{ ...styles?.row }}>
            <View>
              <Image
                source={item?.imagePath ? { uri: item?.imagePath } : images?.user}
                style={{
                  ...styles?.delegateImg
                }}
              />
              <View style={{
                ...styles?.row,
                backgroundColor: COLORS?.white,
                borderRadius: 13,
                justifyContent: 'center',
                marginBottom: 20,
                paddingVertical: 8,
                marginTop: -10
              }}>
                <Image
                  style={{ width: 15, height: 15, marginHorizontal: 5 }}
                  source={icons?.star}
                />
                <Text>{item?.rate}</Text>
              </View>
            </View>

            <View style={{ marginHorizontal: 16 }}>
              <Text style={{
                ...styles?.delegatetxt
              }}>{item?.name}</Text>
              <View style={{ ...styles?.row }}>
                <Image
                  source={icons?.desdination}
                  style={{
                    ...styles?.icon
                  }}
                />
                <Text style={{ ...styles?.smalltxt }}>{item?.noOrders} {t('common:trips')}  | </Text>
                <Text style={{ ...styles?.smalltxt }}>{item?.birth_date} </Text>
              </View>
              <View style={{ ...styles?.row }}>
                <Image
                  source={icons?.location}
                  style={{
                    ...styles?.icon
                  }}
                />
                <Text style={{ ...styles?.smalltxt }}>
                  2.0 {t('common:km')}
                </Text>
                <Text style={{ ...styles?.smalltxt, color: COLORS?.primary, marginHorizontal: SIZES?.base }}>
                  {t('common:ntp')}
                </Text>
              </View>

            </View>

          </View>
          <View style={{ ...styles?.row, justifyContent: 'space-between' }}>
            <Text style={{ ...styles?.txt }}>{t('common:theoffer')}</Text>
            <View style={{ ...styles?.row }}>
              <Text style={{ ...styles?.txt }}>{ }</Text>
              <Text style={{ ...FONTS?.h3, fontSize: 14, color: COLORS?.gray1 }}>{t('common:SAR')}</Text>
            </View>
          </View>
          {/* .........footer btn......... */}
          <View style={{
            ...styles?.row,
            justifyContent: 'space-between',
            marginTop: 23
          }}>
            <MainButton
              style={{
                backgroundColor: COLORS?.gray,
                width: "25%"
              }}
              text={t('common:Reject')}
              Textstyle={{
                color: COLORS?.gray1
              }}
              onPress={() => {


              }}
            />
            <MainButton
              style={{
                width: "65%"
              }}
              text={t('common:Accept')}
              icon={icons?.checkcircle}
              Textstyle={{
                marginHorizontal: 8
              }}
              onPress={() => {

              }}
            />

          </View>

        </View>
      )
    }

    return <FlatList
      data={props?.data ? props?.data : []}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />

  }

  // renders
  return (
    <Modal
      isVisible={props?.isVisible}
      onDismiss={() => {
        props?.onDismiss(false)
      }}
      onBackButtonPress={() => {
        props?.onDismiss(false)
      }}
      style={{
        width: SIZES.width,
        alignSelf: 'center'
      }}
    >
      <View style={{
        backgroundColor: COLORS?.white,
        bottom: 0,
        position: 'absolute',
        width: SIZES?.width,
        padding: 13
      }}>
        {/* {offersView()} */}
        <FlatList
          data={[1]}
          renderItem={(item, index) => {
            return <View>
              <CategoryItem />
              <View style={{
                ...styles?.row,
                justifyContent: 'space-between',
                marginTop: 23
              }}>

                <MainButton
                  style={{
                    width: "65%"
                  }}
                  text={t('common:Accept')}
                  // icon={icons?.checkcircle}
                  Textstyle={{
                    marginHorizontal: 8
                  }}
                  onPress={() => {

                  }}
                />
                <MainButton
                  style={{
                    backgroundColor: COLORS?.gray,
                    width: "25%"
                  }}
                  text={t('common:Reject')}
                  Textstyle={{
                    color: COLORS?.gray1
                  }}
                  onPress={() => {
                   props.onDismiss(false)

                  }}
                />
              </View>
            </View>
          }}
          style={{
            ...styles?.catflatList
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ItemView: {
    padding: 16,
    backgroundColor: COLORS?.gray,
    borderRadius: 6,
    marginTop: 16
  },
  delegateImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS?.gray1

  },
  delegatetxt: {
    ...FONTS?.h2,
    fontSize: 16,
    alignSelf: 'center'
  },
  icon: {
    width: 10,
    height: 10,
    tintColor: COLORS?.gray1,
    marginRight: 8
  },
  smalltxt: {
    ...FONTS?.h2,
    fontSize: 14,
    alignSelf: 'center'
  },
});

export default NewOrderRequest;