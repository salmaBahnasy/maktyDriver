/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Pressable
} from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Actions, GiftedChat, Send } from 'react-native-gifted-chat'

import { COLORS, icons } from '../../constants';
import MainHeader from '../comp/MainHeader';
import { ChatByOrderId, SendMessageById } from './services/services';
import { me } from '../Account/services/services';
import i18next from 'i18next';
// import Toast from 'react-native-simple-toast';



function ChatScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const [messages, setMessages] = useState([]);
  const [order_id, setorder_id] = useState(route?.params?.type == 'OrderDetails' ? JSON?.parse(route?.params.item?.id) :
    route?.params.data?.orderDetails?.createOrder?.data?.id);
  const [page, setPage] = useState(0);
  console.log({ route })
  // ..........................quary......................................
  const { data: userdata, loading: userloading, error: userError, refetch: userRefresh } = useQuery(me); //execute query
  const { data, loading, error, refetch } = useQuery(ChatByOrderId, {
    variables: { order_id, page },
  }); //execute query
  console.log({ data })
  console.log({ loading })
  console.log({ error })
  console.log('userdata?.me?.id-->', userdata?.me?.id)

  const [SendMessageByIdRequest,
    { data: SendMessageByIdData,
      error: SendMessageByIdError }] = useMutation(SendMessageById);
  console.log(SendMessageByIdData)
  console.log(SendMessageByIdError)

  // ................................................................

  useEffect(() => {
    loading == false ?
      setMessages(Array.isArray(data?.chatByOrderId?.data) ? data?.chatByOrderId?.data : [])
      : null
  }, [loading])
  useEffect(() => {
    getAllMessage()
  }, [loading])
  const getAllMessage = () => {
    console.log({ messages })
    console.log("data?.chatByOrderId?.data", data?.chatByOrderId?.data, data?.chatByOrderId?.data?.length)
    if (data?.chatByOrderId?.data?.length > 0) {
      let allMSG = data?.chatByOrderId?.data
      console.log({ allMSG })
      // .sort(
      //   (a, b) => b.created_at - a.created_at,
      // )
      let msg = allMSG?.map(doc => ({
        _id: JSON.parse(doc?.id),
        createdAt: doc.created_at,
        text: doc.message,
        image: doc?.imagePath,
        audio: doc?.voice,
        received: doc?.seen,
        user: {
          _id: JSON.parse(doc.user?.id),
          name: doc.user?.name,
          avatar: doc.user?.imagePath
        },
      }))
      console.log({ msg })
      setMessages(msg)
    }
  }
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    sendMsg(messages)
  }, [])
  const sendMsg = (messages) => {
    let obj = {
      order_id: JSON.parse(order_id),
      message: messages[0]?.text,
      imagePath: messages[0]?.image,
      voice: messages[0]?.audio,
      seen: messages[0]?.received,

    }
    console.log({ obj })
    SendMessageByIdRequest({
      variables: {
        input: obj
      },
    }).then(result => {

      console.log({ result })
      result?.sendMessage?.status == "FAILED" && alert(result?.sendMessage?.message);

      refetch()
      console.log('getchat--->', data)
      console.log('getchat--->', loading)
      // getAllMessage()

    }).catch(e => {
      console.log({ e })
    })
  }

  function renderSend(props) {
    return (
      <Send
        {...props}
      >
        <View style={{
          width: 24,
          height: 24,
          justifyContent: 'center',
          marginRight: 25,
          marginVertical: 10,

        }} >
          <Image
            style={{
              width: 24,
              height: 24,
              alignSelf: 'center',
              resizeMode: 'contain'

            }}
            source={icons?.send} resizeMode={'center'} />
        </View>

      </Send>
    );
  }
  function renderActions(props) {
    return (
      <View style={{ ...styles?.row, marginHorizontal: 10 }} >
        <Pressable
          onPress={() => {

          }}
          style={{ marginBottom: 5, }}>
          <Image source={icons?.voice} style={{ height: 26, width: 16, resizeMode: 'contain' }} />
        </Pressable>
        <Pressable
          onPress={() => {

          }}
          style={{ marginBottom: 5, marginHorizontal: 10 }}>
          <Image source={icons?.attach} style={{ height: 26, width: 25, resizeMode: 'contain' }} />
        </Pressable>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, }}>
      <MainHeader
        leftIcon={i18next.language == 'ar' ? icons?.LArrow : icons?.RArrow}
        stringURL={true}
        delivery={route?.params?.type == 'OrderDetails' ?
          route?.params.item?.delegate?.imagePath :
          route?.params?.delegateData?.imagePath}
        secondimg={{
          borderRadius: 26.5,
          backgroundColor: COLORS?.gray1,
        }}
        title={route?.params?.type == 'OrderDetails' ?
          route?.params.item?.delegate?.name :
          route?.params?.delegateData?.name}
        subtitle={route?.params?.type == 'OrderDetails' ?
          route?.params.item?.delegate?.mobile :
          route?.params?.delegateData?.mobile}
        leftIconAction={() => {
          navigation?.goBack()
        }}
        style={{
          paddingTop: Platform?.OS == 'ios' ? 30 : 10
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: JSON?.parse(userdata?.me?.id),
          avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
        }}
        renderSend={renderSend}
        alwaysShowSend
        textInputStyle={{
          color: COLORS?.appBlack,
          height: 100
        }}
      // renderActions={renderActions}
      />
      {/* {
          Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
        } */}
    </View>

  );
}

const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ChatScreen;
