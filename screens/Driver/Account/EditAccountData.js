import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Pressable,
  Image,
  Text,
  View,
  ScrollView,
  I18nManager
} from 'react-native';
const { ReactNativeFile } = require("apollo-upload-client");
import { COLORS, FONTS, icons, images } from '../../../constants';
import MainInput from '../../comp/MainInput';
import MainButton from '../../comp/MainButton';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../../comp/MainHeader';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import FeedBackBottomView from '../../comp/FeedBackBottomView';
import ChangePasswordBottomView from '../../comp/ChangePasswordBottomView';
import { useMutation, useQuery } from '@apollo/client';
import { me, updatePassword_GQL, updateProfile_GQL } from './services/services';
import { countryCode, ImageURL } from '../../../constants/constVariable';
import DatePickerModal from '../../comp/DatePickerModal';
import { launchImageLibraryFunc, Upload } from '../SignUp/services/Services';



function EditDriverAccountData() {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();
  const navigation = useNavigation()
  const [changePass, setChangePass] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [feedbackdesc, setFeedbackdesc] = useState('')
  const [feedbackheader, setFeedbackheader] = useState('')
  const [feedbackImg, setFeedbackImg] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userAvatar, setUserAvatar] = useState(icons?.user)


  const { data, loading, refetch } = useQuery(me); //execute query
  console.log({ data })
  console.log({ loading })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [gender, setGender] = useState('')
  const [birth_date, setBirth_date] = useState('')

  const [nameErr, setNameErr] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [mobileErr, setMobileErr] = useState("")
  const [bithDateErr, setbirth_dateErr] = useState("")
  const [genderErr, setgenderErr] = useState("")

  const [updateProfileRequest,
    { data: updateProfileData,
      loading: updateProfileloading,
      error, reset }] = useMutation(updateProfile_GQL);

  const [updatePasswordRequest,
    { data: updatePasswordData,
      loading: updatePasswordloading,
      error: updatePasswordError, reset: resetPassword }] = useMutation(updatePassword_GQL);

  console.log({ updatePasswordData })
  console.log({ updatePasswordError })

  useEffect(() => {
    if (!loading) {
      setName(data?.me?.name)
      if (data?.me?.mobile?.startsWith('+')) {
        console.log("true")
        let phone = data?.me?.mobile?.substring(4)
        console.log({ phone })
        setMobile(phone)

      } else {
        setMobile(data?.me?.mobile)

      }
      setEmail(data?.me?.email)
      setGender(data?.me?.gender ? data?.me?.gender : '')
      setBirth_date(data?.me?.birth_date ? data?.me?.birth_date : '')
    }

  }, [data, loading])

  useEffect(() => {
    if (error) {
      if (error?.graphQLErrors.length > 0) {
        console.log(".....>", typeof error?.graphQLErrors[0]?.extensions?.validation)
        let objType = typeof error?.graphQLErrors[0]?.extensions?.validation
        if (objType == 'object') {
          let [key, val] = Object.entries(error?.graphQLErrors[0]?.extensions?.validation)[0]
          console.log('val', val?.toString(), key)
          let msg = val?.toString()
          var afterDot = key.substring(key.indexOf('.') + 1);
          console.log({ afterDot })
          console.log({ msg })
          if (afterDot == 'email') {
            setEmailErr(msg)
          } else if (afterDot == 'name') {
            setNameErr(msg)

          } else if (afterDot == 'mobile') {
            setMobileErr(msg)

          } else if (afterDot == 'gender') {
            setgenderErr(msg)

          } else if (afterDot == 'birth_date') {
            setbirth_dateErr(msg)

          }

          // setValidationMsg(msg)
        } else {
          // setValidationMsg(error?.message)
        }
      } else {
        // setValidationMsg(error?.message)

      }
    }

  }, [error])




  // .................................................................................................
  const Inputvalidation = () => {
    if (name == '') {
      setNameErr(t('common:enterName'))
    }
    if (mobile == '') {
      setMobileErr(t('common:enterphone'))
    }
    if (email == '') {
      setEmailErr(t('common:enterEmail'))
    }
    if (gender == '') {
      setgenderErr(t('common:entergender'))
    }
    // if (birth_date == '') {
    //   setbirth_dateErr(t('common:enterbirth_date'))
    // }
    if (name &&
      email &&
      mobile
    ) {
      updateFunction()
    }
  }
  const updateFunction = () => {
    let updatedData = {
      name,
      email,
      mobile: `${countryCode}${mobile}`,
      gender,
      birth_date
    }
    console.log({ updatedData })
    updateProfileRequest({
      variables: {
        input: updatedData
      },
    }).then(result => {
      console.log({ result })
      setFeedback(true)
      setFeedbackheader(t('common:changeDataSucc'))
      setFeedbackdesc(t('common:changeDataSucc'))
      setFeedbackImg(images?.editaccount)
    });
  }
  const updatePasswordFunction = (old_password, password, password_confirmation) => {
    let updatedpassData = {
      old_password,
      password,
      password_confirmation,
    }

    console.log({ updatedpassData })
    updatePasswordRequest({
      variables: {
        input: updatedpassData
      },
    }).then(result => {
      console.log({ result })
      // if (reset?.data?.updatePassword?.status == "FAIL"){

      // }else{
      setFeedback(true)
      setFeedbackheader(result?.data?.updatePassword?.status)//(t('common:changepassSucc'))
      setFeedbackdesc(result?.data?.updatePassword?.message) // (t('common:changepassSuccDesc'))
      setFeedbackImg(images?.changPass)
      setChangePass(false)
      // }

    });
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const [uploadRequest, { data: uploadData, loading: uploadLoading }] = useMutation(Upload);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date1) => {
    console.log("A date has been picked: ", date1.toISOString().slice(0, 10));
    let format = date1.toISOString().slice(0, 10)
    setBirth_date(format)
    hideDatePicker();
  };
  // ................................................................
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS?.white }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'light-content'}
      />
      {/* .... */}
      <FeedBackBottomView
        isVisible={feedback}
        onDismiss={(val) => {
          setFeedback(val)
          refetch()
          console.log("new user data", data)
        }}
        image={feedbackImg}
        header={feedbackheader}
        desc={feedbackdesc}
        btntext={t('common:ok')}
      />
      <ChangePasswordBottomView
        isVisible={changePass}
        onDismiss={(val) => {
          setChangePass(val)
        }}
        saveChanges={(old_password, password, password_confirmation) => {
          updatePasswordFunction(old_password, password, password_confirmation)
          // setChangePass(false)

        }}

      />
      <DatePickerModal
        isDatePickerVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
      />
      {/* ............. */}
      <MainHeader
        title={t('common:editaccount')}
        leftIcon={I18nManager?.isRTL ? icons?.LArrow : icons?.RArrow}
        leftIconAction={() => { navigation.goBack() }}
      />
      <ScrollView

      >
        <View style={{ marginTop: 22 }}>
          <Image
            source={typeof userAvatar === 'string' ?
              { uri: `${ImageURL}${userAvatar}` } :
              userAvatar}
            style={{
              ...styles?.avatar,
              borderWidth:1
            }}
            borderRadius={70}
          />
          <Pressable
            style={{
              ...styles?.changeAvatar

            }}
            onPress={async () => {
              let photores = await launchImageLibraryFunc()
              console.log({ photores })
              let avatar = await UploadImageFunction(photores)
              console.log({ avatar })
              setUserAvatar(avatar)
            }}
          >
            <Image
              source={icons?.camera}
              style={{
                ...styles?.icon
              }}
            />
          </Pressable>
        </View>

        <MainInput
          style={{
            marginTop: 30,
            ...styles?.input

          }}
          value={name}
          err={nameErr}
          onChange={(val) => {
            console.log(val)
            setName(val)
            setNameErr('')
            // setValidationMsg('')
          }}
        />
        {
          nameErr ?
            <Text
              style={{ ...styles?.error }}
            >{nameErr}</Text>
            : null
        }
        <MainInput
          style={{
            ...styles?.input,
          }}
          value={mobile}
          countryCode={countryCode}
          type={'phone'}
          keyboardType={'numeric'}
          onChange={(val) => {
            console.log(val)
            setMobile(val)
            setMobileErr('')
            // setValidationMsg('')
          }}
          err={mobileErr}
        />
        {
          mobileErr ?
            <Text
              style={{ ...styles?.error }}
            >{mobileErr}</Text>
            : null
        }
        <MainInput
          style={{
            ...styles?.input
          }}

          value={email}
          onChange={(val) => {
            console.log(val)
            setEmail(val)
            setEmailErr('')
            // setValidationMsg('')
          }}
          err={emailErr}
        />
        {
          emailErr ?
            <Text
              style={{ ...styles?.error }}
            >{emailErr}</Text>
            : null
        }
        <Text style={{
          ...styles?.gheaderText
        }}>
          {t('common:gender')}
        </Text>
        <View
          style={{
            ...styles?.row,
            ...styles?.genderView
          }}
        >
          <Pressable
            style={{
              ...styles?.genderBtn,
              backgroundColor: gender == 'female' ? COLORS.primary : COLORS?.gray,
              marginRight: 16,
              
            }}
            onPress={() => {
              setGender("female")
              setgenderErr("")
            }}
          >

            <Text style={{
              ...styles?.gText,
              color: gender == 'female' ? COLORS?.white : COLORS.black,
              lineHeight:40
            }}>
              {t('common:female')}
            </Text>
          </Pressable>
          <Pressable
            style={{
              ...styles?.genderBtn,
              backgroundColor: gender == 'male' ? COLORS.primary : COLORS?.gray,
            }}
            onPress={() => {
              setGender("male")
              setgenderErr('')
            }}
          >
            <Text style={{
              ...styles?.gText,
              color: gender == 'male' ? COLORS?.white : COLORS.black
            }}>
              {t('common:male')}
            </Text>
          </Pressable>
        </View>
        {
          genderErr ?
            <Text
              style={{ ...styles?.error }}
            >{genderErr}</Text>
            : null
        }
        <Text style={{
          ...styles?.gheaderText
        }}>
          {t('common:birthdate')}
        </Text>
        <Pressable
          style={{
            ...styles?.forgetPassView,
            marginVertical: 5
          }}
          onPress={() => {
            setbirth_dateErr('')
            showDatePicker()
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
              {birth_date ? birth_date : t('common:birthdate')}
            </Text>
            <Image
              source={icons?.calendar}
              style={{ ...styles?.smallIcon, resizeMode: 'contain' }}
            />
          </View>
        </Pressable>
        {
          bithDateErr ?
            <Text
              style={{ ...styles?.error }}
            >{bithDateErr}</Text>
            : null
        }


        <Pressable
          onPress={() => { setChangePass(true) }}
          style={{
            ...styles?.forgetPassView,
            marginBottom: 16
          }}>
          <Image
            source={icons?.lock}
            style={{ ...styles?.smallIcon }} />
          <Text
            style={{
              ...FONTS?.body3,
              color: COLORS?.txtgray,
              marginHorizontal: 9,
            }}>
            {t('common:changPass')}
          </Text>
        </Pressable>
        <MainButton
          disabled={updateProfileloading}
          text={t('common:save')}
          onPress={() => {
            Inputvalidation()


          }}
        />

      </ScrollView>

    </SafeAreaView>
  );
}



export default EditDriverAccountData;
