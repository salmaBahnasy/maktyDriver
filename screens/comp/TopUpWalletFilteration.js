import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image,Pressable } from 'react-native';
import Modal from "react-native-modal";
import { COLORS, FONTS, SIZES ,icons} from '../../constants';
import MainButton from './MainButton';


const TopUpWalletFilteration = (props) => {


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
                <Pressable
          style={{
            ...styles?.forgetPassView,
            marginVertical: 5
          }}
          onPress={() => {
            // setbirth_dateErr('')
            props?.showDatePicker()
          }}
        >

          <View style={{
            justifyContent: 'space-between',
            height: 56,
            backgroundColor: COLORS?.gray,
            flex: 1,
            borderRadius: 6,
            paddingHorizontal: 8,
            ...styles?.row,
          }}>
            <Text style={{
              color: COLORS?.txtgray,
            }}>
              {/* {birth_date ? birth_date : t('common:birthdate')} */}
            </Text>
            <Image
              source={icons?.calendar}
              style={{ ...styles?.smallIcon, resizeMode: 'contain' }}
            />
          </View>
        </Pressable>
        <Pressable
          style={{
            ...styles?.forgetPassView,
            marginVertical: 5
          }}
          onPress={() => {
            // setbirth_dateErr('')
            props?.showDatePicker()
          }}
        >

          <View style={{
            justifyContent: 'space-between',
            height: 56,
            backgroundColor: COLORS?.gray,
            flex: 1,
            borderRadius: 6,
            paddingHorizontal: 8,
            ...styles?.row,
          }}>
            <Text style={{
              color: COLORS?.txtgray,
            }}>
              {/* {birth_date ? birth_date : t('common:birthdate')} */}
            </Text>
            <Image
              source={icons?.calendar}
              style={{ ...styles?.smallIcon, resizeMode: 'contain' }}
            />
          </View>
        </Pressable>

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
  smallIcon:{
    width:20,
    height:20,
    resizeMode:'contain'
  },
  row:{
    flexDirection:'row',
    alignItems:'center'
  }
});

export default TopUpWalletFilteration;