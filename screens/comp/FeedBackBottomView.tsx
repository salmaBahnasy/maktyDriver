import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Modal from "react-native-modal";
import { COLORS, FONTS, SIZES } from '../../constants';
import MainButton from './MainButton';


const FeedBackBottomView = (props: any) => {


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
        <Image
          source={props?.image}
          style={{
            width: 142,
            height: 153
          }}
        />
        <View style={{
          width: '95%',
          alignSelf: 'center'
        }}>
          <Text style={{
            ...FONTS?.h2,
            alignSelf:'flex-start',
            color: COLORS?.appBlack,
            fontSize: 24,
            lineHeight: 48,

          }}>
            {props?.header}
          </Text>
          <Text style={{
            ...FONTS?.body2,
            alignSelf:'flex-start',
            color: COLORS?.appBlack,
            fontSize: 16,
            lineHeight: 32
          }}>
            {props?.desc}
          </Text>

          <MainButton
            text={props?.btntext}
            onPress={() => {
              props?.onDismiss(false)
              props?.feedBackAction ? props?.feedBackAction() : null

            }}
            style={{
              width: '100%',
              marginTop: 32
            }}
          />
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
});

export default FeedBackBottomView;