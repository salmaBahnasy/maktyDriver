import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import Modal from "react-native-modal";
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import MainButton from './MainButton';
import { useTranslation } from 'react-i18next';


const GetDeleveryAddressModal = (props) => {
  const { t } = useTranslation();
  // ...............................................
  const renderItem = ({ item, index }) => {
    return <Pressable
    onPress={()=>{
      props?.action()
    }}
    style={{ ...styles?.row }}>
      <Image source={icons?.location}
        style={{
          width: 18,
          height: 22,
          tintColor: COLORS?.gray1
        }}
      />
      <View style={{ marginLeft: 11 }}>
        <Text style={{ ...styles?.title }}>مجمع النصر،الرياض</Text>
        <Text style={{ ...styles?.description }}>Alnasr compound, alriyadh</Text>
      </View>

    </Pressable>
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
        ...styles?.mainView
      }}>
        <FlatList
          data={[1, 11, 1, 1, 1, 1, 1]}
          extraData={[1, 11, 1, 1, 1, 1, 1]}
          renderItem={renderItem}
          ListHeaderComponent={() => {
            return (
              <Text style={{
                ...styles?.header
              }}>
                {t('common:delvto')}
              </Text>
            )

          }}
          style={{
            marginHorizontal: 24
          }}
        />


        <MainButton
          text={t('common:ok')}
          onPress={() => {
            props?.onDismiss(false)
            props?.action()

          }}
          style={{
            width: '100%',
            marginTop: 32
          }}
        />
      </View>

    </Modal>
  );
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
  title: {
    ...FONTS?.h3,
    fontSize: 16,
    color: COLORS?.appBlack
  },
  description: {
    ...FONTS?.body3,
    fontSize: 16,
    color: COLORS?.gray1
  },
  header: {
    ...FONTS?.h2,
    fontSize: 24,
    textTransform: 'capitalize',
    marginTop: 24,
    marginBottom: 8
  },
  mainView:{
    backgroundColor: COLORS?.white,
    bottom: 0,
    position: 'absolute',
    width: SIZES?.width,
    padding: 13
  }
});

export default GetDeleveryAddressModal;