
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  Image,
  KeyboardAvoidingView,
  Pressable,
  I18nManager,
  View
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { COLORS, icons, images, SIZES } from '../../../constants';
import MainInput from '../../comp/MainInput';
import MainButton from '../../comp/MainButton';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  CarTypes,
  Nationalities
} from './services/Services';
import { useMutation, useQuery } from '@apollo/client/react';
import { Area_GQL, CITIES_GQL } from '../../Address/services/services';
import DropDownList from '../../comp/DropDownList';
import DatePickerModal from '../../comp/DatePickerModal';
import { countryCode } from '../../../constants/constVariable';



function SignUpForDriver() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };
  const { t } = useTranslation();

  const [showDropdown, setshowDropdown] = useState(false)
  const [selectedDropListData, setselectedDropListData] = useState([])
  const [dropDownType, setdropDownType] = useState([])
  const [name, setName] = useState("")
  const [plate_number, setplate_number] = useState("")
  const [plate_numbererr, setplate_numbererr] = useState("")
  const [letter_plate_number, setletter_plate_number] = useState("")
  const [letter_plate_numberErr, setletter_plate_numberErr] = useState("")
  const [serial_plate_number, setserial_plate_number] = useState("")
  const [serial_plate_numberErr, setserial_plate_numberErr] = useState("")
  const [national_id, setnational_id] = useState("")
  const [nationality_id, setnationality_id] = useState("")
  const [nationality_label, setnationality_label] = useState("")
  const [mobile, setmobile] = useState("")
  const [car_type_id, setcar_type_id] = useState("")
  const [car_label, setcar_label] = useState("")
  const [birth_date, setbirth_date] = useState("")
  const [city_id, setcity_id] = useState("")
  const [city_label, setcity_label] = useState("")
  const [area_id, setarea_id] = useState("")
  const [area_label, setArea_label] = useState("")
  const [nameErr, setNameErr] = useState("")
  const [national_idErr, setnational_idErr] = useState("")
  const [nationalityErr, setnationalityErr] = useState("")
  const [mobileErr, setmobileErr] = useState("")
  const [birthdateErr, setbirthdateErr] = useState("")
  const [carTypeErr, setcarTypeErr] = useState("")
  const [areaErr, setareaErr] = useState("")
  const [cityErr, setcityErr] = useState("")
  const [focus, setfocus] = useState(false)


  const [validationMsg, setValidationMsg] = useState("")
  // ............................................................
  const CityqueryReslut = useQuery(CITIES_GQL);
  const NationalitiesReslut = useQuery(Nationalities);
  const CarTypesReslut = useQuery(CarTypes);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {
    data: AreaqueryReslut,
  } = useQuery(Area_GQL, { variables: { city_id }, })

  // ............................................................

  // useEffect(() => {
  //   if (error) {
  //     if (error?.graphQLErrors.length > 0) {
  //       console.log(".....>", typeof error?.graphQLErrors[0]?.extensions?.validation)
  //       let objType = typeof error?.graphQLErrors[0]?.extensions?.validation
  //       if (objType == 'object') {
  //         let [key, val] = Object.entries(error?.graphQLErrors[0]?.extensions?.validation)[0]
  //         console.log('val', val?.toString(), key)
  //         let msg = val?.toString()
  //         var afterDot = key.substring(key.indexOf('.') + 1);
  //         console.log({ afterDot })
  //         console.log({ msg })
  //         // setValidationMsg(msg)
  //         if (afterDot == 'email') {
  //           setEmailErr(msg)
  //         }
  //         if (afterDot == 'name') {
  //           setNameErr(msg)

  //         }
  //         if (afterDot == 'mobile') {
  //           setMobileErr(msg)

  //         }
  //         if (afterDot == 'password') {
  //           setPasswordErr(msg)

  //         }
  //         if (afterDot == 'password_confirmation') {
  //           setPassword_confirmationErr(msg)

  //         }
  //       } else {
  //         setValidationMsg(error?.message)
  //       }
  //     } else {
  //       setValidationMsg(error?.message)

  //     }
  //     // seterroMsg(val.messages)
  //   }

  // }, [error])
  const validation = () => {

    if (name == '') {
      setNameErr(t('common:enterName'))
    }
    if (nationality_id == '') {
      setnationalityErr(t('common:enternationality_id'))
    }
    if (mobile == '') {
      setmobileErr(t('common:enterphone'))
    }
    if (national_id == '') {
      setnational_idErr(t('common:enteryournationalty'))
    }
    if (birth_date == '') {
      setbirthdateErr(t('common:enterbirth_date'))
    }
    if (city_id == '') {
      setcityErr(t('common:entercity'))
    }
    if (area_id == '') {
      setareaErr(t('common:enterarea'))
    }
    if (car_type_id == '') {
      setcarTypeErr(t('common:entercartype'))
    }
    if (serial_plate_number == '') {
      setserial_plate_numberErr(t('common:enterserial_plate_number'))
    }
    if (letter_plate_number == '') {
      setletter_plate_numberErr(t('common:enterletter_plate_number'))
    }
    // if (plate_number == '') {
    //   setplate_numbererr(t('common:enterplate_number'))
    // }
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date1) => {
    console.log("A date has been picked: ", date1.toISOString().slice(0, 10));
    let format = date1.toISOString().slice(0, 10)
    setbirth_date(format)
    hideDatePicker();
  };
  return (
    <SafeAreaView style={{ ...backgroundStyle }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' :'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <DropDownList
        onDismiss={(val) => {
          setshowDropdown(val)
        }}
        isVisible={showDropdown}
        data={selectedDropListData}
        btntext={t('common:close')}
        choose={(val, type) => {
          if (type == 'nationalities') {
            setnationality_id(JSON.parse(val?.id))
            setnationality_label(val?.title)
          }
          if (type == 'City') {
            setcity_id(JSON.parse(val?.id))
            setcity_label(val?.title)
          }
          if (type == 'Area') {
            setarea_id(JSON.parse(val?.id))
            setArea_label(val?.title)
          }
          if (type == 'CarType') {
            setcar_type_id(JSON.parse(val?.id))
            setcar_label(val?.title)
          }

        }}
        type={dropDownType}
      />
      <DatePickerModal
        isDatePickerVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
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
            source={I18nManager?.isRTL ? icons?.arback : icons?.back}
            style={{
              ...styles?.SignUpbackbtn
            }}
          />
        </Pressable>
        {/* <KeyboardAvoidingView behavior='padding'> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex:1,height:SIZES?.height,marginTop:focus?-SIZES.height:0}}
        >
          <Image
            source={images?.logo}
            style={{
              ...styles?.logo,

            }} />
          <Text
            style={{
              ...styles?.BoldPrimaryText,
              marginBottom: 46
            }}>
            {/* {`Welcome to makfy! \n Join us now`} */}
            {t('common:welcometxt')}
          </Text>
          {/* <KeyboardAvoidingView 
          
          behavior='padding'
          > */}
            <MainInput
              placeholder={t('common:fullname')}
              onChange={(val) => {
                console.log(val)
                setName(val)
                setNameErr('')
                setValidationMsg('')
              }}
              style={{
                marginBottom: 16
              }}
              err={nameErr}

            />
            {nameErr ? <Text
              style={{
                ...styles?.error

              }}
            >{nameErr}</Text> : null}
            <Pressable
              style={{
                ...styles?.inputcontainer,
                borderWidth: nationalityErr ? 1 : 0

              }}
              onPress={() => {
                setdropDownType('nationalities')
                setselectedDropListData(NationalitiesReslut?.data?.nationalities)
                setshowDropdown(true)
                setnationalityErr('')

              }}
            >
              <Text style={{
                ...styles?.text,
                color: nationality_label ? COLORS?.appBlack : COLORS?.gray1
              }}>
                {nationality_label ? nationality_label : t('common:nationality')}
              </Text>
              <Image
                style={{
                  ...styles?.icon
                }}
                source={icons?.downarrow}
              />
            </Pressable>
            {nationalityErr ? <Text
              style={{
                ...styles?.error

              }}
            >{nationalityErr}</Text> : null}

            <MainInput
              countryCode={countryCode}
              placeholder={t('common:Phonenumber')}
              onChange={(val) => {
                console.log(val)
                setmobile(val)
                setmobileErr('')
                setValidationMsg('')
              }}
              style={{
                marginBottom: 16
              }}
              keyboardType={'numeric'}
              err={mobileErr}
              type={'phone'}
            />
            {mobileErr ? <Text
              style={{
                ...styles?.error

              }}
            >{mobileErr}</Text> : null}
            <MainInput
              placeholder={t('common:nationalityID')}
              onChange={(val) => {
                console.log(val)
                setnational_id(val)
                setnational_idErr('')
                setValidationMsg('')
              }}
              style={{
                marginBottom: 16
              }}
              err={national_idErr}
             
            />
            {national_idErr ? <Text
              style={{
                ...styles?.error

              }}
            >{national_idErr}</Text> : null}

            <Pressable
              style={{
                ...styles?.inputcontainer,
                borderWidth: birthdateErr ? 1 : 0

              }}
              onPress={() => {
                setDatePickerVisibility(true)
                setbirthdateErr('')
              }}
            >
              <Text
                style={{
                  ...styles?.text,
                  color: birth_date ?
                    COLORS?.appBlack :
                    COLORS?.gray1
                }}>
                {birth_date ? birth_date : t('common:birthdate')}
              </Text>
              <Image
                style={{
                  ...styles?.icon
                }}
                source={icons?.downarrow}
              />
            </Pressable>
            {birthdateErr ? <Text
              style={{
                ...styles?.error

              }}
            >{birthdateErr}</Text> : null}


            <Pressable
              style={{
                ...styles?.inputcontainer,
                borderWidth: cityErr ? 1 : 0

              }}
              onPress={() => {
                setdropDownType('City')
                setselectedDropListData(CityqueryReslut?.data?.cities)
                setshowDropdown(true)
                setcityErr('')
              }}
            >
              <Text style={{
                ...styles?.text,
                color: city_label ?
                  COLORS?.appBlack :
                  COLORS?.gray1
              }}>
                {city_label ? city_label : t('common:City')}
              </Text>
              <Image
                style={{
                  ...styles?.icon
                }}
                source={icons?.downarrow}
              />
            </Pressable>
            {cityErr ? <Text
              style={{
                ...styles?.error

              }}
            >{cityErr}</Text> : null}


            <Pressable
              style={{
                ...styles?.inputcontainer,
                borderWidth: areaErr ? 1 : 0

              }}
              onPress={() => {
                setdropDownType('Area')
                setselectedDropListData(AreaqueryReslut?.areas)
                setshowDropdown(true)
                setareaErr('')
              }}
            >
              <Text
                style={{
                  ...styles?.text,
                  color: area_label ?
                    COLORS?.appBlack :
                    COLORS?.gray1
                }}>
                {area_label ? area_label : t('common:Area')}
              </Text>
              <Image
                style={{
                  ...styles?.icon
                }}
                source={icons?.downarrow}
              />
            </Pressable>
            {areaErr ? <Text
              style={{
                ...styles?.error

              }}
            >{areaErr}</Text> : null}


            <Pressable
              style={{
                ...styles?.inputcontainer,
                borderWidth: carTypeErr ? 1 : 0

              }}
              onPress={() => {
                setdropDownType('CarType')
                setselectedDropListData(CarTypesReslut?.data?.car_types)
                setshowDropdown(true)
                setcarTypeErr('')
              }}
            >
              <Text style={{
                ...styles?.text,
                color: car_label ? COLORS?.appBlack : COLORS?.gray1
              }}>
                {car_label ? car_label : t('common:carType')}
              </Text>
              <Image
                style={{
                  ...styles?.icon
                }}
                source={icons?.downarrow}
              />
            </Pressable>
            {carTypeErr ? <Text
              style={{
                ...styles?.error

              }}
            >{carTypeErr}</Text> : null}
            <Text
              style={{
                ...styles?.subtitle,
              }}
            >
              {t('common:carPlate')}
            </Text>
            <View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES?.base
              }}>
                <View style={{ flex: 1 }}>
                  <MainInput
                    placeholder={t('common:Numbers')}
                    onChange={(val) => {
                      console.log(val)
                      setserial_plate_number(val)
                      setserial_plate_numberErr('')
                      setValidationMsg('')
                    }}
                    style={{
                      marginBottom: 16,
                    }}
                    err={serial_plate_numberErr}
                    onFocus={(val)=>{
                      setfocus(val)
                    }}
                  />
                  {serial_plate_numberErr ? <Text
                    style={{
                      ...styles?.error

                    }}
                  >{serial_plate_numberErr}</Text> : null}
                </View>

                <View style={{ flex: 1 }}>
                  <MainInput
                    placeholder={t('common:letters')}
                    onChange={(val) => {
                      console.log(val)
                      setletter_plate_number(val)
                      setletter_plate_numberErr('')
                      setValidationMsg('')
                      
                    }}
                    style={{
                      marginBottom: 16,

                    }}
                    textInputStyle={{
                      width: '100%'
                    }}
                    err={letter_plate_numberErr}
                    onFocus={(val)=>{
                      setfocus(val)
                      
                    }}
                  />
                  {letter_plate_numberErr ? <Text
                    style={{
                      ...styles?.error
                    }}
                  >{letter_plate_numberErr}</Text> : null}
                </View>
              </View>
            </View>

            <MainInput
              placeholder={t('common:carnumbers')}
              onChange={(val) => {
                console.log(val)
                // setplate_number(val)
                // setplate_numbererr('')
              }}
              style={{
                marginBottom: 16
              }}
              err={plate_numbererr}
              onFocus={(val)=>{
                setfocus(val)
              }}
              value={`${serial_plate_number}${letter_plate_number}`}
            />
            {plate_numbererr ? <Text
              style={{
                ...styles?.error

              }}
            >{plate_numbererr}</Text> : null}


            {validationMsg ? <Text
              style={{
                ...styles?.error
              }}
            >{validationMsg}</Text> : null}
           
          {/* </KeyboardAvoidingView> */}
          <MainButton
              text={t('common:next')}
              style={{
                marginBottom: 43
              }}
              onPress={() => {
                validation()
                if (
                  name &&
                  national_id &&
                  nationality_id &&
                  mobile &&
                  birth_date &&
                  city_id &&
                  area_id &&
                  car_type_id &&
                  letter_plate_number &&
                  serial_plate_number 
                ) {
                  let obj = {
                    name,
                    national_id,
                    nationality_id,
                    mobile,
                    birth_date,
                    city_id,
                    area_id,
                    car_type_id,
                    letter_plate_number,
                    serial_plate_number,
                    plate_number:`${serial_plate_number}${letter_plate_number}`,
                  }
                  console.log(obj)
                  navigation?.navigate('DriverRequst', {
                    data: obj
                  })
                }

              }}
            // disabled={loading}
            />
        </ScrollView>
        
        {/* </KeyboardAvoidingView> */}
      </ImageBackground>
    </SafeAreaView>
  );
}



export default SignUpForDriver;
