import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, Pressable } from 'react-native';
import Modal from "react-native-modal";
import { COLORS, FONTS, SIZES } from '../../constants';
import MainButton from './MainButton';


const DropDownList = (props) => {
  console.log({ props })
  const List = () => {
    const renderItem = ({ item, index }) => {
      return (
        <Pressable
          onPress={() => {
            props?.choose(item, props?.type)
            props?.onDismiss(false)
          }}
        >
          <Text
            key={`${item?.id}`}
            style={{
              ...styles?.txt
            }}>
            {item?.title}
          </Text>
          <View
            style={{ ...styles?.line }}
          />
        </Pressable>
      )
    }
    return <FlatList
      data={props?.data}
      extraData={props?.data}
      renderItem={renderItem}
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
        {props?.image && <Image
          source={props?.image}
          style={{
            width: 142,
            height: 153
          }}
        />}
        <View style={{
          width: '95%',
          alignSelf: 'center'
        }}>
          <Text style={{
            ...FONTS?.h2,
            alignSelf: 'flex-start',
            color: COLORS?.appBlack,
            fontSize: 24,
            lineHeight: 48,

          }}>
            {props?.header}
          </Text>

          {
            List()
          }


          <MainButton
            text={props?.btntext}
            onPress={() => {
              props?.onDismiss(false)
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
  line: {
    width: '90%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: COLORS?.gray1,
    marginVertical: SIZES?.base
  },
  txt: {
    ...FONTS?.h3,
    alignSelf: 'flex-start',
    color: COLORS?.appBlack,
    alignSelf: 'center',
    width: '90%'
  }
});

export default DropDownList;