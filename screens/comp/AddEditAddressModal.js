import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet,
  Image, ScrollView,
  KeyboardAvoidingView, Pressable
} from 'react-native';
import Modal from "react-native-modal";

import { COLORS, FONTS, icons, SIZES } from '../../constants';
import MainButton from './MainButton';
import MainInput from './MainInput';
import { useTranslation } from 'react-i18next';
import { SelectList } from 'react-native-dropdown-select-list'
import { countryCode } from '../../constants/constVariable';
import { getCurrentLocation } from './services/MainServices';


const AddEditAddressModal = (props) => {

  const { t } = useTranslation();
  const [city_id, setcityid] = useState(null)
  const [area_id, setArea_id] = useState(null)
  const [address_id, setAaddress_id] = useState('')
  const [title, setTitle] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [type, settype] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [is_main, setIs_main] = useState('')
  //  erro-------------------------------------------------------
  const [titleErr, setTitleErr] = useState()
  const [addressErr, setAddressErr] = useState()
  const [typeErr, settypeErr] = useState()
  const [areaidErr, setareaidErr] = useState()
  const [cityidErr, setcityidErr] = useState()
  const [mobileErr, setMobileErr] = useState()

  let TypeArray = [
    { key: 0, value: t("common:home") },
    { key: 1, value: t("common:work") },
    { key: 2, value: t("common:other") }]


  // ......set default state
  useEffect(() => {

    setTitle(props?.AddressObject?.title ? props?.AddressObject?.title : '')
    setMobile(props?.AddressObject?.mobile ?
      props?.AddressObject?.mobile?.startsWith('+') ?
        props?.AddressObject?.mobile.substring(4)
        :
        props?.AddressObject?.mobile : props?.mobile)
    setAddress(props?.AddressObject?.address ? props?.AddressObject?.address : '')
    setNotes(props?.AddressObject?.notes ? props?.AddressObject?.notes : '')
    settype(props?.AddressObject?.type ? JSON.parse(props?.AddressObject?.type) : 0)
    setLatitude(props?.AddressObject?.latitude ? props?.AddressObject?.latitude : "0")
    setLongitude(props?.AddressObject?.longitude ? props?.AddressObject?.longitude : "0")
    setIs_main(props?.AddressObject?.is_main ? props?.AddressObject?.is_main : false)
    setAaddress_id(props?.AddressObject?.id ? JSON.parse(props?.AddressObject?.id) : 0)
    setArea_id(props?.AddressObject?.area?.id
      ? JSON.parse(props?.AddressObject?.area?.id) : null)
    setcityid(props?.AddressObject?.city?.id
      ? JSON.parse(props?.AddressObject?.city?.id) : null)
    settypeErr()

  }, [props?.isVisible])
  // ......set end default state
  useEffect(() => {
    if (props?.type == 'add') {
      getCurrentLocationFunc()
    } else {
    }
  }, [props?.type])
  const dropdown = (data, type, err, label, select) => {
    const onSelect = (val) => {
      if (type == 'city') {
        props?.city_id(val)
        setcityid(val ? JSON?.parse(val) : 1)
        setcityidErr()
      } else if (type == 'type') {
        settype(val)
        settypeErr()
      } else {
        props?.areaId(val)
        setArea_id(val ? JSON?.parse(val) : 1)
        setareaidErr()
      }
    }
    return <SelectList
      setSelected={(val) => {
        onSelect(val)
      }}
      data={Array.isArray(data) ? data : []}
      save="key"
      search={false}
      boxStyles={{
        ...styles?.boxStyles,
        borderWidth: err ? 1 : 0,

      }}
      dropdownStyles={{
        ...styles?.dropdownstyle
      }}
      dropdownTextStyles={{
        color: COLORS?.gray1
      }}
      inputStyles={{
        ...styles?.inputStyles
      }}
      placeholder={type == "type" ?
        select == 0 ? t("common:home") : select == 1 ?
          t("common:work")
          : t("common:other")
        : select ? select?.title : label}
    />
  }
  const getCurrentLocationFunc = () => {
    getCurrentLocation().then(location => {
      setLatitude(JSON.stringify(location?.latitude))
      setLongitude(JSON.stringify(location?.longitude))
    })
  }
  const validationInput = () => {
    if (title == '') {
      setTitleErr(t('common:Address_name'))
    }
    if (address == '') {
      setAddressErr(t('common:Address_name'))
    }
    if (mobile == '') {
      setMobileErr(t('common:enterphone2'))
    }
    checkDropDownValidation()
  }
  const checkDropDownValidation = () => {
    if (!Number.isInteger(type)) {
      settypeErr(t('common:somethingWrong'))
    }
    if (!Number.isInteger(city_id)) {
      setcityidErr(t('common:somethingWrong'))
    }
    if (!Number.isInteger(area_id)) {
      setareaidErr(t('common:somethingWrong'))

    }
  }

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
        ...styles?.mainModal

      }}>
        <KeyboardAvoidingView behavior='padding'>
          <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          >
            <Text
              style={{
                ...styles?.title
              }}>
              {props?.modeltitle}
            </Text>
            <Text style={{ ...styles?.label }}>
              {t('common:Address_name')}
            </Text>
            <MainInput
              placeholder={t('common:Address_name')}
              onChange={(val) => {
                console.log(val)
                setTitle(val)
                setTitleErr()
              }}
              style={{
                marginBottom: 16
              }}
              value={title}
              err={titleErr}
            />
            <Text style={{ ...styles?.label }}>
              {t('common:type')}
            </Text>
            {dropdown(TypeArray, 'type', typeErr, t('common:type'), props?.AddressObject?.type)}
            <Text style={{ ...styles?.label }}>
              {t('common:City')}
            </Text>
            {dropdown(props?.cityArray, 'city', cityidErr, t('common:City'), props?.AddressObject?.city)}
            <Text style={{ ...styles?.label }}>
              {t('common:Area')}
            </Text>
            {dropdown(props?.areaArray, 'area', areaidErr, t('common:Area'), props?.AddressObject?.area)}
            <Text style={{ ...styles?.label }}>
              {t('common:Address')}
            </Text>
            <MainInput
              placeholder={t('common:AddressPlaceHolder')}
              onChange={(val) => {
                console.log(val)
                setAddress(val)
                setAddressErr()
              }}
              style={{
                // marginBottom: 16
              }}
              value={address}
              err={addressErr}
            />
            <Text style={{ ...styles?.label }}>
              {t('common:Phone_number')}
            </Text>
            <MainInput
              placeholder={t('common:Phone_number')}
              onChange={(val) => {
                console.log(val)
                setMobile(val)
                setMobileErr()
              }}
              keyboardType={"numeric"}
              type='phone'
              value={mobile}
              countryCode={countryCode}
              err={mobileErr}
            />
            <Text style={{ ...styles?.label }}>
              {t('common:Notes')}
            </Text>
            <MainInput
              placeholder={t('common:Notes')}
              onChange={(val) => {
                console.log(val)
                setNotes(val)
              }}
              style={{
                // marginBottom: 16
              }}
              value={notes}
            />
            <Pressable
              onPress={() => {
                setIs_main(!is_main)
              }}
              style={{
                ...styles?.row,
                ...styles?.ismainview
              }}>
              <Image source={is_main ? icons?.check : icons?.uncheck}
                style={{
                  ...styles?.checkbox
                }}
              />
              <Text
                style={{
                  ...styles?.colorTxt
                }}
              >{t('common:mainadd')}</Text>
            </Pressable>
            <View
              style={{
                ...styles?.row,
                ...styles?.btnView
              }}
            >
              <MainButton
                text={props?.actionText}
                style={{
                  width: '60%'
                }}
                onPress={() => {
                  if (props?.type == 'add') {
                    validationInput()
                    let obj = {
                      title,
                      mobile: `${countryCode}${mobile}`,
                      latitude,
                      longitude,
                      address,
                      notes,
                      is_main,
                      type,
                      city_id,
                      area_id
                    }
                    console.log({ obj })
                    props?.AddAdressRequest(obj)


                  } else {
                    checkDropDownValidation()
                    let obj = {
                      title,
                      mobile: `${countryCode}${mobile}`,
                      latitude,
                      longitude,
                      address,
                      notes,
                      is_main,
                      type,
                      city_id,
                      area_id,
                      address_id: JSON.parse(address_id)
                    }
                    console.log({ obj })
                    props?.EditAdressRequest(obj)

                  }
                }}
                Textstyle={{
                  textTransform: 'uppercase'
                }}
              disabled={props?.loading}
              />
              <MainButton
                text={t('common:back')}
                style={{
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
              />
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
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
  label: {
    ...FONTS?.h4,
    fontSize: 16,
    marginVertical: 13,
    marginHorizontal: 18,
    alignSelf:'flex-start'
  },
  boxStyles: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: COLORS?.gray,
    color: COLORS?.gray1,
    borderColor: COLORS?.red
  },
  dropdownstyle: {
    width: "90%",
    alignSelf: 'center',
    backgroundColor: COLORS?.gray,
    color: COLORS?.gray1,
    borderWidth: 0
  },
  inputStyles: {
    ...FONTS?.body5,
    color: COLORS?.gray1,
  },
  title: {
    ...FONTS?.h2,
    textAlign: 'center',
    marginTop: 24,
    color: COLORS?.appBlack,
    fontSize: 24
  },
  mainModal: {
    backgroundColor: COLORS?.white,
    bottom: 0,
    position: 'absolute',
    width: SIZES?.width,
    padding: 13,
    height: SIZES?.height - 200
  },
  ismainview: {
    paddingHorizontal: 18,
    marginTop: 18
  },
  checkbox: {
    width: 22,
    height: 22,
    tintColor: COLORS?.primary
  },
  colorTxt: {
    ...FONTS?.body4,
    color: COLORS?.primary,
    marginHorizontal: 5
  },
  btnView: {
    paddingHorizontal: 18
    , marginTop: 30,
    justifyContent: 'space-between'
  }

});

export default AddEditAddressModal;