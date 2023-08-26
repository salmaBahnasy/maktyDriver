
import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Actions, Bubble, GiftedChat, Send } from 'react-native-gifted-chat'

import { COLORS, icons } from '../../../constants';
import MainHeader from '../../comp/MainHeader';
import { ChatByOrderId, SendMessageById } from './services/services';
import i18next from 'i18next';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { me } from '../Account/services/services';
import { Upload } from '../SignUp/services/Services';


const options = {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 300,
};
function ChatScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const [messages, setMessages] = useState([]);
  const [order_id, setorder_id] = useState(route?.params?.type == 'OrderDetails' ? JSON?.parse(route?.params.item?.id) :
  route?.params.order?.order?.id?
  JSON?.parse(route?.params.order?.order?.id):0);
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
  const [uploadRequest, { data:uploadRequestData, loading:uploadRequestLoading, error:uploadRequestError }] = useMutation(Upload);

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
    // connectTOSocket()
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
  // ---------------------end socket---------------------\\
  // const connectTOSocket = async () => {
  //   console.log('socket.....', socket)
  //   AsyncStorage.getItem('token').then(token => {
  //     console.log({ token })
  //     if (socket.connected == true) {
  //       console.log("null")
  //       listentoMessage()
  //     } else {
  //       console.log("connection....")
  //       socket.auth.token = token;
  //       console.log('socket.....', socket)
  //       socket.on("connect", () => {
  //         console.log("connect", socket.id); // x8WIv7-mJelg7on_ALbx
  //         listentoMessage()
  //       });
  //       socket.on("disconnect", () => {
  //         console.log("disconnect", socket); // undefined
  //       });
  //       socket.on("connect_error", () => {
  //         socket.auth.token = token;
  //         console.log("connect_error", socket); // undefined
  //         socket.disconnect().connect();
  //         // socket.connect();

  //       });
  //       socket.connect()
  //     }
  //   })
  // }
  // const listentoMessage = async () => {
  //   await socket.on("NewMessage", (arg) => {
  //     console.log({ arg })
  //   })
  // }
  // ---------------------end socket---------------------\\

  // ...............................................
  const onSend = useCallback((messages = []) => {
    console.log({ messages })
    // messages[0].image = messagesImage
    console.log("messages",messages)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    sendMsg(messages)
  }, [])
  const sendMsg = (messages) => {
    console.log("sendMsg....>",messages)
    let obj = {
      order_id: JSON.parse(order_id),
      message:Array.isArray(messages)?messages[0]?.text? messages[0]?.text:messages[0]?.image: messages?.text? messages?.text:messages?.image,
      // imagePath: messages?.image,
      // voice: messages?.audio?messages?.audio:'',
      // seen: messages?.received?messages?.received:true,
    }
    console.log({ obj })
    SendMessageByIdRequest({
      variables: {
        input: obj
      },
    }).then(result => {
      console.log({ result })
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
      <View style={{ ...styles?.row, marginHorizontal: 10, marginBottom: 10 }} >
        <Pressable
          onPress={() => {
            handleImagecapeture()
          }}
        >
          <Image source={icons?.camera}
            style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: COLORS?.gray1 }} />
        </Pressable>
        <Pressable
          onPress={() => {
            console.log("...app...")
            handleImageSelection()
          }}
          style={{ marginHorizontal: 20 }}>
          <Image source={icons?.attach} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
        </Pressable>
      </View>
    );
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#007AFF',
          },
          left: {
            backgroundColor: '#E5E5EA',
          },
        }}
      />
    );
  };
  const renderMessageImage = (props) => {
    const {
      currentMessage: { image },
    } = props;
    return <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />;
  };
  const handleImageSelection = () => {
    launchImageLibrary(options, (response) => {
      console.log({ response })
      if (response?.assets) {
        UploadImageFunction(response?.assets[0])

        // onSend({
        //   image: response?.assets[0]?.uri,
        //   user: {
        //     _id: JSON?.parse(userdata?.me?.id),
        //     avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
        //     , // ID of the sender
        //   },
        // })

      }
    });
  };
  const UploadImageFunction = async (photores) => {
    try {
        // if (photores?.type == 'success') {
          const file = new ReactNativeFile({
            uri: photores.uri,
            name: photores.fileName,
            type: photores.type,
          });
          console.log({ file });
          uploadRequest({
            variables: {
              file
            },
          }).then(result => {
            console.log({ result });

            onSend({
              _id: Math.round(Math.random() * 1000000),
              image: `${ImageURL}${result?.data.upload}`,
              user: {
                _id: JSON?.parse(userdata?.me?.id),
                avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                , // ID of the sender
              },
            })
            // resolve(result?.data.upload);
          });

        // } else {
         
        // }
      
    } catch (err) {
      console.log({ err });
    }
  }
  const handleImagecapeture = () => {
    launchCamera(options, (response) => {
      console.log({ response })
      if (response?.assets) {
        // setMessagesImage({ image: response?.assets[0]?.uri })
        UploadImageFunction(response?.assets[0])

        // onSend({
        //   image: response?.assets[0]?.uri,
        //   user: {
        //     _id: JSON?.parse(userdata?.me?.id),
        //     avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
        //     , // ID of the sender
        //   },
        // })

      }
    });
  };
  return (
    <>
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
          height: 150,
          padding: 10
        }}
        renderBubble={renderBubble}
        renderMessageImage={renderMessageImage}
        renderActions={renderActions}
      />
      {/* {
          Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
        } */}
    </>

  );
}


const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ChatScreen;
