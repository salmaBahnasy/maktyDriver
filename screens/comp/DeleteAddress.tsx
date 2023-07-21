import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Modal from "react-native-modal";
import { COLORS, FONTS, SIZES } from '../../constants';
import MainButton from './MainButton';
import { useTranslation } from 'react-i18next';


const DeleteAddress = (props: any) => {
  const { t } = useTranslation();


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
       
        <View style={{
          width: '95%',
          alignSelf: 'center'
        }}>
          <Text style={{
            color: COLORS?.appBlack,
            fontSize: 24,
            lineHeight: 48,
            fontWeight: 'bold',

            fontFamily: 'Tajawal-Bold'

          }}>
            {props?.header}
          </Text>
          <Text style={{
            color: COLORS?.gray1,
            fontSize: 16,
            lineHeight: 32
          }}>
            {props?.desc}
          </Text>

          <View
            style={{
              ...styles?.row,
              paddingHorizontal: 18
              , marginTop: 30,
              justifyContent: 'space-between'
            }}
          >
            <MainButton
              text={props?.actionText}
              style={{
                // marginBottom: 43
                width: '60%'
              }}
              onPress={() => {
                props?.action()
              }}
              Textstyle={{
                // textTransform: 'uppercase'
                fontSize:16
              }}
            // disabled={}
            />
            <MainButton
              text={t('common:back')}
              style={{
                // marginBottom: 43
                width: '30%',
                backgroundColor: COLORS?.white
              }}
              onPress={() => {
                props?.onDismiss()
              }}
              Textstyle={{
                ...FONTS?.h4,
                color: COLORS?.gray1
              }}
            // disabled={}
            />
          </View>
        </View>

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
  row:{
    flexDirection:'row',
    alignItems:'center'
  }
});

export default DeleteAddress;