import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Modal from "react-native-modal";
import { COLORS, FONTS, SIZES, images, icons } from '../../constants';
import MainButton from './MainButton';
import { useTranslation } from 'react-i18next';
import CategoryItem from '../Driver/Home/Component/CategoryItem';


const NewOrderRequest = (props) => {
  const { t } = useTranslation();
console.log("props?.data",props?.orderData)

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
          data={Array.isArray( props?.orderData)?props?.orderData:[1]}
          renderItem={(item, index) => {
            return <View>
              <CategoryItem item={item?.item} />
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
                    props.ConfirmDelegateOrderfnc(item?.item)
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