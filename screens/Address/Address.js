import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Pressable,
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  I18nManager
} from 'react-native';


import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import MainButton from '../comp/MainButton';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../comp/MainHeader';
import { useTranslation } from 'react-i18next';
import AddEditAddressModal from '../comp/AddEditAddressModal';
import DeleteAddress from '../comp/DeleteAddress';
import { useMutation, useQuery } from '@apollo/client';
import {
  ADDADDREESS_GQL,
  ADDRESS_GQL, Area_GQL,
  CITIES_GQL, DELETEADDREESS_GQL,
  setAreaFunction,
  setcityArrayFunction,
  UPDATEADDREESS_GQL,
  USERMOBILE
} from './services/services';
import EmptyView from '../comp/EmptyView';


function Address() {
  const { t } = useTranslation();
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setShowModalTitle] = useState()
  const [modalbuttonTitle, setShowModalButtonTitle] = useState()
  const [showFeedback, setshowFeedback] = useState()
  const [page, setPage] = useState(0)
  const [first, setFirst] = useState(12)
  const [city_id, setCity_id] = useState(0)
  const [areaId, setareaId] = useState(0)
  const [modalType, setModalType] = useState()
  const [cityArray, setCityArray] = useState([])
  const [areaArray, setAreaArray] = useState([])
  const [addressObjctDetails, setAddressObjctDetails] = useState({})
  const [isloading, setIsloading] = useState(false)

  // .......call get address quary
  const getAllAddress = useQuery(ADDRESS_GQL, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    variables: { page, first },
  })
  const CityqueryReslut = useQuery(CITIES_GQL);
  const {
    data: AreaqueryReslut,
  } = useQuery(Area_GQL, { variables: { city_id }, })
  const { data: userMobileQuary } = useQuery(USERMOBILE); //execute query
  console.log({ userMobileQuary })

  // .....mutations----------------------------------------------
  const [DeleteAdressRequest,] = useMutation(DELETEADDREESS_GQL, {
    refetchQueries: [{ query: ADDRESS_GQL }]
  });
  const [AddAdressRequest, { data: AddAddress, error: AddAddressError }] = useMutation(ADDADDREESS_GQL, {
    refetchQueries: [{ query: ADDRESS_GQL }]
  });
  const [EditAdressRequest, { data: updateAddress, error: updateAddressError }] = useMutation(UPDATEADDREESS_GQL, {
    refetchQueries: [{ query: ADDRESS_GQL }]
  });

  console.log({ updateAddress })
  console.log({ updateAddressError })
  console.log({ AddAddress })
  console.log({ AddAddressError })
  // .....set city array for dropdown ------
  useEffect(() => {
    setcityArray()
  }, [CityqueryReslut])
  // .....set area array for dropdown ------
  useEffect(() => {
    setAreaByCityId()
  }, [AreaqueryReslut])

  const setcityArray = () => {
    setcityArrayFunction(CityqueryReslut?.data?.cities).then(cityres => {
      console.log({ cityres })
      setCityArray(cityres)
    })
  }
  const setAreaByCityId = () => {
    setAreaFunction(AreaqueryReslut?.areas).then(areares => {
      console.log({ areares })
      setAreaArray(areares)
    })
  }
  const delFunction = () => {
    DeleteAdressRequest({
      variables: {
        input: {
          address_id: JSON?.parse(addressObjctDetails?.id)
        }
      }
    }).then(resulte => {
      console.log({ resulte })
      setshowFeedback(false)
    })
  }

  // ...........................View..................................................................
  function ListNotView() {
    const renderItem = ({ item, index }) => {
      return <View style={{
        ...styles?.cartView
      }}>
        <View
          style={{ flexDirection: 'row' }}
        >
          <View style={{ width: '75%' }}>
            <Text
              numberOfLines={2}
              style={{
                ...styles?.title
              }}
            >
              {item?.title}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                ...styles?.title
              }}
            >
              {item?.address}
            </Text>
          </View>

          <View
            style={{ ...styles?.row }}
          ><Pressable
            onPress={() => {
              setAddressObjctDetails(item)
              setModalType('edit')
              setShowModal(true)
              setShowModalTitle(t('common:editadd'))
              setShowModalButtonTitle(t('common:edit'))
            }}
          >
              <Image
                source={icons?.edit}
                style={{
                  ...styles?.icons
                }}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setshowFeedback(true)
                setAddressObjctDetails(item)
              }}
            >
              <Image
                source={icons?.del}
                style={{
                  ...styles?.icons
                }}
              />
            </Pressable>
          </View>
        </View>
        <Text
          numberOfLines={2}
          style={{
            ...styles?.title
          }}
        >
          {item?.mobile}
        </Text>


      </View>
    }
    return <FlatList
      data={getAllAddress?.data?.addresses?.data}
      extraData={getAllAddress?.data?.addresses?.data}
      renderItem={renderItem}
      ListEmptyComponent={() => {
        return <EmptyView
          image={icons?.addraess}
          msg={t('common:noAddressAvailble')}
        />
      }}
    />
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS?.white
      }}>
      <MainHeader
        title={t('common:Myaddress')}
        leftIcon={I18nManager?.isRTL ? icons?.LArrow : icons?.RArrow}
        leftIconAction={() => { navigation.goBack() }}
        style={{
          marginBottom: 10
        }}
      />
      <AddEditAddressModal
        isVisible={showModal}
        onDismiss={(val) => {
          setShowModal(val)
        }}
        modeltitle={modalTitle}
        actionText={modalbuttonTitle}
        cityArray={cityArray && Array.isArray(cityArray) ? cityArray : []}
        areaArray={areaArray && Array.isArray(areaArray) ? areaArray : []}
        city_id={(val) => {
          console.log('area id', val)
          setCity_id(JSON?.parse(val))
        }}
        areaId={(val) => {
          setareaId(val)
        }}
        type={modalType}
        AddressObject={addressObjctDetails}
        AddAdressRequest={(obj) => {
          setIsloading(true)
          AddAdressRequest({
            variables: {
              input: obj
            },
          }).then(result => {
            console.log({ result })
            setShowModal(false)
            setIsloading(false)
            getAllAddress.refetch()

          });
        }}
        EditAdressRequest={(obj) => {
          setIsloading(true)
          EditAdressRequest({
            variables: {
              input: obj
            },
          }).then(result => {
            console.log({ result })
            setShowModal(false)
            setIsloading(false)
            getAllAddress.refetch()

          });
        }}
        mobile={userMobileQuary?.me?.mobile?.startsWith('+') ?
          userMobileQuary?.me?.mobile.substring(4) :
          userMobileQuary?.me?.mobile}
        loading={isloading} 
      />
      <DeleteAddress
        isVisible={showFeedback}
        onDismiss={(val) => {
          setshowFeedback(val)
        }}
        header={t('common:Delete_address')}
        desc={t('common:Delete_address_Desc')}
        actionText={t('common:Delete_address')}
        action={() => {
          delFunction()
          getAllAddress.refetch()

        }}
      />
      {getAllAddress?.loading ?
        <ActivityIndicator
          style={{
            alignSelf: 'center',
            marginTop: SIZES?.padding
          }}
          color={COLORS?.appyellow}
          size={'small'}
        />
        :
        ListNotView()
      }
      {!getAllAddress?.loading &&
        <MainButton
          text={t('common:addnewadd')}
          onPress={() => {
            setAddressObjctDetails("")
            setModalType('add')
            setShowModal(true)
            setShowModalTitle(t('common:addnewadd'))
            setShowModalButtonTitle(t('common:add'))
          }}
          icon={icons?.add}
          style={{
            marginBottom: 20,
          }}
          Textstyle={{
            fontSize: 16,
          }}
        />}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  xIcon: {
    width: 16,
    height: 16
  },
  cartView: {
    backgroundColor: COLORS?.noteBg,
    marginHorizontal: 14,
    marginVertical: 4,
    borderRadius: 10,
    padding: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txt: {
    color: COLORS?.txtgray,
    fontSize: 16,
    marginHorizontal: 8
  },
  title: {
    ...FONTS?.body3,
    color: COLORS?.appBlack,
    fontSize: 16,
    lineHeight: 32,
    textAlign: 'left'
  },
  icons: {
    width: 16,
    height: 20,
    marginHorizontal: 8
  }
})

export default Address;
