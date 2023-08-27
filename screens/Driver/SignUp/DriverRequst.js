
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  Image,

  Pressable,
  I18nManager,
  View
} from 'react-native';
const { ReactNativeFile } = require("apollo-upload-client");
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import MainInput from '../../comp/MainInput';
import MainButton from '../../comp/MainButton';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Banks, DriverREGISTER_GQL, launchImageLibraryFunc, Upload } from './services/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { countryCode, ImageURL, socket } from '../../../constants/constVariable';
import { useMutation, useQuery } from '@apollo/client';
import DropDownList from '../../comp/DropDownList';
import FeedBackBottomView from '../../comp/FeedBackBottomView';


function DriverRequst() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const { t } = useTranslation();
  const route = useRoute()
  const [email, setEmail] = useState("")
  const [bank_id, setbank_id] = useState("")
  const [bank_label, setbank_label] = useState("")
  const [car_license, setcar_license] = useState("")
  const [driving_license, setdriving_license] = useState("")
  const [userAvatar, setUserAvatar] = useState(icons?.camera)
  const [car_licenseErr, setcar_licenseErr] = useState("")
  const [driving_licenseErr, setdriving_licenseErr] = useState("")

  const [bankerror, setbankerror] = useState("")
  const [iban, setIban] = useState("")
  const [ibanErr, setIbanErr] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [validationMsg, setValidationMsg] = useState("")
  const [focus, setfocus] = useState(false)
  const [isVisible, setisVisible] = useState(false)
  const [isSelected, setisSelected] = useState(false)

  // .........................................................................
  const [showDropdown, setshowDropdown] = useState(false)
  const [selectedDropListData, setselectedDropListData] = useState([])
  const [dropDownType, setdropDownType] = useState([])
  // ------------------------mutation-----------------------------
  const [registerRequest,
    { data: driverRegister,
      loading: driverRegisterLoading,
      error: driverRegisterErr,
      reset: driverRegisterrest }] = useMutation(DriverREGISTER_GQL);
  const [uploadRequest, { data, loading, error, reset }] = useMutation(Upload);
  // --------------------------Query---------------------------------------
  const BanksReslut = useQuery(Banks);
  // --------------------------------------------------------------------

  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [password_confirmationErr, setPassword_confirmationErr] = useState("")

  const connectTOSocket = () => {
    socket.connected == true ?
      null
      :
      console.log('connect---->')
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
    socket.on("connect_error", () => {
      console.log(socket.id); // undefined
    });
    socket.connect()
  }
  const disconnect = () => {
    socket.disconnect == true ? null
      :
      console.log('disconnect---->')
    socket.disconnect()
    socket.on("disconnect", () => {
      console.log(socket); // undefined
    });
    socket.close()
  }


  useEffect(() => {
    if (driverRegisterErr) {
      if (driverRegisterErr?.graphQLErrors.length > 0) {
        console.log(".....>", typeof driverRegisterErr?.graphQLErrors[0]?.extensions?.validation)
        let objType = typeof driverRegisterErr?.graphQLErrors[0]?.extensions?.validation
        if (objType == 'object') {
          let [key, val] = Object.entries(driverRegisterErr?.graphQLErrors[0]?.extensions?.validation)[0]
          console.log('val', val?.toString(), key)
          let msg = val?.toString()
          var afterDot = key.substring(key.indexOf('.') + 1);
          console.log({ afterDot })
          console.log({ msg })
          // setValidationMsg(msg)
          if (afterDot == 'email') {
            setEmailErr(msg)
          }
          if (afterDot == 'iban') {
            setIban(msg)
          }
          if (afterDot == 'car_license') {
            setcar_licenseErr(msg)
          }
          if (afterDot == 'driving_license') {
            setdriving_licenseErr(msg)
          }
          if (afterDot == 'mobile') {
            setValidationMsg(msg)
          }
          if (afterDot == 'name') {
            setValidationMsg(msg)
          }
          if (afterDot == 'plate_number') {
            setValidationMsg(msg)
          }
          if (afterDot == 'letter_plate_number') {
            setValidationMsg(msg)
          }
          if (afterDot == 'serial_plate_number') {
            setValidationMsg(msg)
          }
          if (afterDot == 'serial_plate_number') {
            setValidationMsg(msg)
          }

          if (afterDot == 'national_id') {
            setValidationMsg(msg)
          }
          if (afterDot == 'city_id') {
            setValidationMsg(msg)
          }
          if (afterDot == 'area_id') {
            setValidationMsg(msg)
          }

          if (afterDot == 'nationality_id') {
            setValidationMsg(msg)
          }
          if (afterDot == 'car_type_id') {
            setValidationMsg(msg)
          }
          if (afterDot == 'bank_id') {
            setValidationMsg(msg)
          }
          if (afterDot == 'birth_date') {
            setValidationMsg(msg)
          }

          if (afterDot == 'password') {
            setPasswordErr(msg)

          }
          if (afterDot == 'password_confirmation') {
            setPassword_confirmationErr(msg)

          }
        } else {
          setValidationMsg(error?.message)
        }
      } else {
        setValidationMsg(error?.message)

      }
      // seterroMsg(val.messages)
    }

  }, [driverRegisterErr])

  const validation = () => {
    if (email == '') {
      setEmailErr(t('common:enterEmail'))
    }
    if (iban == '') {
      setIbanErr(t('common:enteriban'))
    }
    if (car_license == '') {
      setcar_licenseErr(t('common:entercar_license'))
    }
    if (driving_license == '') {
      setdriving_licenseErr(t('common:driving_license'))
    }
    if (password == '') {
      setPasswordErr(t('common:enterPassword'))
    }
    if (bank_id == '') {
      setbankerror(t('common:Chooseyourbank'))
    }
    if (password_confirmation == '') {
      setPassword_confirmationErr(t('common:enterPassword'))
    }
    if (password !== password_confirmation) {
      setPassword_confirmationErr(t('common:notIdentical'))
    }
  }
  const UploadImageFunction = async (photores) => {
    try {
      return await new Promise((resolve, reject) => {
        if (photores?.type == 'success') {
          const file = new ReactNativeFile({
            uri: photores.data.uri,
            name: photores.data.fileName,
            type: photores.data.type,
          });
          console.log({ file });
          uploadRequest({
            variables: {
              file
            },
          }).then(result => {
            console.log({ result });
            resolve(result?.data.upload);
          });

        } else {
          resolve(false);
        }
      });
    } catch (err) {
      console.log({ err });
    }
  }
  function Fileplaceholder(title, action, img, err) {
    return (
      <View style={{ flex: 1 }}>
        <Pressable
          style={{
            ...styles?.filesPlaceHolder
          }}
          onPress={() => {
            console.log('ttt', title)
            action()
          }}
        >
          {img ?
            <Image
              source={{ uri: `${ImageURL}${img}` }}
              style={{
                width: '90%',
                height: '90%'
              }}
            />
            :
            <>
              <Image
                source={icons?.upload}
                style={{
                  ...styles?.uploadicon
                }}
              />
              <Text
                style={{
                  ...styles?.blacktxt
                }}
              >
                {title}
              </Text>
            </>}
        </Pressable>
        <Text style={{ ...styles?.error }}>
          {err}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ ...backgroundStyle }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FeedBackBottomView
        isVisible={isVisible}
        onDismiss={(val) => {
          setisVisible(val)
        }}
        header={t('common:accountcreatsuccess')}
        desc={t('common:connectWithAdmin')}
        feedBackAction={() => {
          
          navigation.navigate('LoginDriver')
        }}
        btntext={t('common:close')}
      />
      <DropDownList
        onDismiss={(val) => {
          setshowDropdown(val)
        }}
        isVisible={showDropdown}
        data={selectedDropListData}
        btntext={t('common:close')}
        choose={(val, type) => {

          if (type == 'Bank') {
            setbank_id(JSON.parse(val?.id))
            setbank_label(val?.title)
          }
        }}
        type={dropDownType}
      />
      <ImageBackground
        source={images?.login}
        style={{
          ...styles?.imageContainer
        }}
      >
        <Pressable
          onPress={() => {
            navigation?.goBack()
          }}
        >
          <Image
            source={I18nManager?.isRTL ?
              icons?.arback :
              icons?.back}
            style={{
              ...styles?.SignUpbackbtn
            }}
          />
        </Pressable>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: focus ? -SIZES.height / 2 - 200 : 0
          }}
        >
          <Image
            source={images?.logo}
            style={{
              ...styles?.logo,
              marginBottom: 20
            }} />
          <Text
            style={{
              ...styles?.BoldPrimaryText,
              marginBottom: 20
            }}>
            {t('common:welcometxtdreiverReq')}
          </Text>
          <Pressable
            style={{ ...styles?.avatar }}
            onPress={async () => {
              let photores = await launchImageLibraryFunc()
              console.log({ photores })
              let avatar = await UploadImageFunction(photores)
              console.log({ avatar })
              setUserAvatar(avatar)
            }}
          >
            <Image
              style={[{
                ...styles?.driveAvatar,
              },
              typeof userAvatar !== 'string' && {
                tintColor: COLORS?.gray1
              },
              typeof userAvatar == 'string' && {
                width: 130,
                height: 130,
                borderRadius: 65
              }
              ]}
              source={typeof userAvatar === 'string' ?
                { uri: `${ImageURL}${userAvatar}` } :
                userAvatar}
            />
          </Pressable>
          <Text
            style={{
              ...styles?.primetxt
            }}
          >
            {t('common:Uploadyourphoto')}
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
              marginVertical: 16,
              ...styles?.row,

            }}
          >

            {Fileplaceholder(t('common:driving_license'),
              async () => {
                setdriving_licenseErr('')
                let UploadcivilID = await launchImageLibraryFunc()
                console.log({ UploadcivilID })
                let drivinglicense = await UploadImageFunction(UploadcivilID)
                console.log({ drivinglicense })
                setdriving_license(drivinglicense)
              },
              driving_license,
              driving_licenseErr
            )}
            {Fileplaceholder(t('common:car_license'),
              async () => {
                setcar_licenseErr('')
                let Uploadlicense = await launchImageLibraryFunc()
                console.log({ Uploadlicense })
                let carlicense = await UploadImageFunction(Uploadlicense)
                console.log({ carlicense })
                setcar_license(carlicense)
              },
              car_license,
              car_licenseErr
            )}

          </View>
          {/* <KeyboardAvoidingView behavior='padding'> */}
          <MainInput
            placeholder={t('common:email')}
            onChange={(val) => {
              console.log(val)
              setEmail(val)
              setEmailErr('')
              setValidationMsg('')
            }}
            style={{
              marginBottom: 16
            }}
            err={emailErr}
            onFocus={(val) => {
              setfocus(val)
            }}
          />
          {emailErr ? <Text
            style={{
              ...styles?.error

            }}
          >{emailErr}</Text> : null}

          <Pressable
            style={{
              ...styles?.inputcontainer,
              borderWidth: bankerror ? 1 : 0

            }}
            onPress={() => {
              setdropDownType('Bank')
              setselectedDropListData(BanksReslut?.data?.banks)
              setshowDropdown(true)
              setbankerror('')
            }}
          >
            <Text style={{
              ...styles?.text,
              color: bank_label ?
                COLORS?.appBlack :
                COLORS?.gray1

            }}>
              {bank_label ?
                bank_label :
                t('common:Chooseyourbank')}
            </Text>
            <Image
              style={{
                ...styles?.icon
              }}
              source={icons?.downarrow}
            />
          </Pressable>
          {bankerror ?
            <Text
              style={{
                ...styles?.error
              }}
            >
              {bankerror}
            </Text> : null}

          <MainInput
            placeholder={t('common:iban')}
            onChange={(val) => {
              console.log(val)
              setIban(val)
              setIbanErr('')
              setValidationMsg('')
            }}
            style={{
              marginBottom: 16
            }}
            err={ibanErr}
            onFocus={(val) => {
              setfocus(val)
            }}
          />
          {ibanErr ? <Text
            style={{
              ...styles?.error

            }}
          >{ibanErr}</Text> : null}
          <MainInput
            placeholder={t('common:Passworhere')}
            onChange={(val) => {
              console.log(val)
              setPassword(val)
              setPasswordErr('')
              setValidationMsg('')
            }}
            style={{
              marginBottom: 16
            }}
            secureTextEntry={true}
            rightIcon={icons?.showpassword}
            err={passwordErr}
            onFocus={(val) => {
              setfocus(val)
            }}
          />
          {passwordErr ? <Text
            style={{
              ...styles?.error

            }}
          >{passwordErr}</Text> : null}
          <MainInput
            placeholder={t('common:Passworhere')}
            onChange={(val) => {
              console.log(val)
              setPassword_confirmation(val)
              setPassword_confirmationErr('')
              setValidationMsg('')
            }}
            style={{
              marginBottom: 16
            }}
            secureTextEntry={true}
            rightIcon={icons?.showpassword}
            err={password_confirmationErr}
            onFocus={(val) => {
              setfocus(val)
            }}
          />
          {password_confirmationErr ? <Text
            style={{
              ...styles?.error
            }}
          >{password_confirmationErr}</Text> : null}
          {validationMsg ?
            <Text
              style={{
                ...styles?.error
              }}
            >
              {validationMsg}
            </Text> : null}

          <Pressable
          onPress={()=>{
            setisSelected(!isSelected)
          }}
          style={{
            ...styles?.acceptPriv
          }}>
            <Image
              source={isSelected?icons?.conditioncheck:icons?.unconditioncheck}
              style={{
                ...styles?.checkIcon
              }}
            />
            <Text style={{ ...FONTS?.body3 }}>
              {t('common:accTermsconditions')}
            </Text>
            <Text style={{
              ...FONTS?.body3,
              color: COLORS.primary,
              marginHorizontal: SIZES?.base
            }}>
              {t('common:readIt')}
            </Text>
          </Pressable>
          <MainButton
            text={t('common:submit')}
            style={{
              marginBottom: 43
            }}
            onPress={() => {
              // connectTOSocket()
              // disconnect()
              // connectTOSocket()
              validation()

              if (iban &&
                email &&
                password &&
                password_confirmation &&
                driving_license &&
                car_license) {

                let data = route?.params?.data
                data.iban = iban
                data.email = email
                data.bank_id = bank_id
                data.password = password
                data.password_confirmation = password_confirmation
                data.driving_license = driving_license
                data.car_license = car_license
                console.log({ data })
                registerRequest({
                  variables: {
                    input: data
                  },
                }).then(result => {
                  console.log({ result })
                  if (result?.data?.registerDelegate?.token) {
                    console.log("result?.data?.login?.token", result?.data?.registerDelegate?.token)
                    
                    AsyncStorage.multiSet([
                      ['token', result?.data?.registerDelegate?.token],
                      ['userType', "driver"]
                    ], () => {
                      setisVisible(true)
                      // navigation.navigate('DriverHome')

                    })
                  } else {
                    // setPasswordError(t('common:incorrectData'))

                  }

                });

              }
              // navigation.navigate('Home')


            }}
          // disabled={loading}
          />
          {/* </KeyboardAvoidingView> */}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}



export default DriverRequst;
