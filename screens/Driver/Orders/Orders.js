import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Pressable,
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  I18nManager,
  ActivityIndicator
} from 'react-native';

import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Order_GQL } from './services/services';
import MainHeader from '../../comp/MainHeader';
import EmptyView from '../../comp/EmptyView';


function DriverOrders() {
  const { t } = useTranslation();
  const navigation = useNavigation()
  const [page, setPage] = useState(0)
  const [status, setStatus] = useState([0, 1, 2, 3])
  const [ordersData, setordersData] = useState([])
  const [tab, settab] = useState('Upcomming')
  const [Loading, setLoading] = useState(true)

  const { data, loading } = useQuery(Order_GQL, {
    variables: { status, page },
  })
  console.log({ data })
  useEffect(() => {
    if (loading == false) {
      setordersData(data?.orderByStatus?.data)
      setLoading(loading)
    } else {

    }
  }, [loading])
  useEffect(() => {
    setPage(0)
    console.log({ loading })
    console.log({ page })
    console.log({ status })
    console.log("data?.orderByStatus?.data", data)
    if (loading == false) {
      setordersData(data?.orderByStatus?.data)
      setLoading(loading)
    } else {

    }


  }, [status, page])

  function ListOfOrders() {
    function statusBtn(txt, style, txtStyle) {
      return (
        <Pressable
          style={{
            ...styles?.statusBtn,
            ...style
          }}
        >
          <Text
            style={{
              ...FONTS?.h5,
              color: COLORS?.gray1,
              ...txtStyle
            }}
          >{txt}</Text>
        </Pressable>
      )
    }
    function previusstatusBtn(txt, style) {
      return (
        <Pressable
          style={{
            ...styles?.statusBtn,
            borderRadius: 0,
            ...style
          }}
        >
          <View style={{ ...styles?.row }}>
            <Image
              source={icons?.checked}
              style={{
                ...styles?.xsicon
              }}
            />
            <Text
              style={{
                ...FONTS?.h5,
                color: COLORS?.appyellow
              }}
            >{t('common:Processing')}</Text>
          </View>
          <Text
            style={{
              ...FONTS?.body6,
              color: COLORS?.white,
            }}
          >3:40 pm</Text>

        </Pressable>
      )
    }
    function header() {
      return <View
        style={{
          ...styles?.row,
          width: '90%',
          alignSelf: 'center',
          marginVertical: 16
        }}
      >
        <Text
          style={{
            flex: 1,
            ...FONTS?.h3,
            color: COLORS?.txtgray, textAlign: 'left'
          }}
        >{t('common:Result')}
          <Text>  ( {ordersData?.length} {t('common:order')} )</Text>
        </Text>
        <View style={{ ...styles?.row }}>
          <Pressable
            style={{
              ...styles?.PressableIcon,
              marginHorizontal: 8,
            }}
          >
            <Image
              source={icons?.filter2}
              style={{
                ...styles?.icon
              }}
            />
          </Pressable>
          <Pressable
            style={{
              ...styles?.PressableIcon,
            }}
          >
            <Image
              source={icons?.filter1}
              style={{
                ...styles?.icon
              }}
            />
          </Pressable>
        </View>
      </View>
    }
    const renderItem = ({ item, index }) => {
      return <View style={{
        ...styles?.cartView
      }}>
        <View
          style={{
            ...styles?.row,
            justifyContent: 'space-between'
          }}

        >
          <Text
            style={{
              ...FONTS?.h2,
              alignSelf: 'flex-start'
            }}
          >{`${t('common:order')} #${item?.id}`}</Text>
          <Pressable
            style={{ ...styles?.row }}
          >
            <Text
              onPress={() => {
                // if (item.status == 2 || item?.status == 3) {
                //   navigation.navigate('ChatScreen', {
                //     item,
                //     type: 'OrderDetails'
                //   })
                // } else {
                navigation.navigate('OrdersDetails', {
                  item
                })
                // }
              }}
              style={{
                ...FONTS?.h4,
                color: COLORS?.appyellow
              }}
            >{t('common:Orderdetails')}</Text>
            <Image
              style={{ ...styles?.icon, marginBottom: SIZES.smallpading }}
              source={I18nManager.isRTL ? icons?.RArrow : icons?.LArrow}
            />
          </Pressable>
        </View>
        <Text style={{
          ...FONTS?.body4,
          color: COLORS?.txtgray,
          marginVertical: 8,
          textAlign: 'left'
        }}>
          {t('common:Status')}
        </Text>
        {/* {
          tab == 'Upcomming' ?  */}
        <View
          style={{
            ...styles?.row,
            backgroundColor: COLORS?.white,
            borderRadius: 17.1
          }}
        >
          {/* <Pressable
              style={{
                ...styles?.statusBtn,
              }}
            >
              <View style={{ ...styles?.row }}>
                <Image
                  source={icons?.checked}
                  style={{
                    ...styles?.xsicon
                  }}
                />
                <Text
                  style={{
                    ...FONTS?.h5,
                    color: COLORS?.appyellow
                  }}
                >{t('common:Processing')}</Text>
              </View>
              <Text
                style={{
                  ...FONTS?.body6,
                  color: COLORS?.white,
                }}
              >3:40 pm</Text>

            </Pressable> */}
          {statusBtn(t('common:pending'), {
            backgroundColor: item?.status >= 0 ? COLORS?.primary : COLORS?.white,
            borderTopRightRadius: item?.status >= 1 ? 0 : 17.1,
            borderBottomRightRadius: item?.status >= 1 ? 0 : 17.1
          },
            {
              color: item?.status >= 0 ? COLORS?.white : COLORS?.gray1,
            })}
          {statusBtn(t('common:Preparing'), {
            backgroundColor: item?.status >= 1 ? COLORS?.primary : COLORS?.white,
            borderTopLeftRadius: item?.status >= 1 ? 0 : 17.1,
            borderBottomLeftRadius: item?.status >= 1 ? 0 : 17.1,
            borderTopRightRadius: item?.status == 3 ? 0 : 17.1,
            borderBottomRightRadius: item?.status == 3 ? 0 : 17.1
          }, {
            color: item?.status >= 1 ? COLORS?.white : COLORS?.gray1,
          })}
          {statusBtn(t('common:Shipped'), {
            backgroundColor: item?.status >= 3 ? COLORS?.primary : COLORS?.white,
            borderTopLeftRadius: item?.status >= 3 ? 0 : 17.1,
            borderBottomLeftRadius: item?.status >= 3 ? 0 : 17.1,
            borderTopRightRadius: item?.status == 5 ? 0 : 17.1,
            borderBottomRightRadius: item?.status == 5 ? 0 : 17.1
          }, {
            color: item?.status >= 3 ? COLORS?.white : COLORS?.gray1,
          })}
          {statusBtn(t('common:Delivered'), {
            backgroundColor: item?.status >= 5 ? COLORS?.primary : COLORS?.white,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }, {
            color: item?.status >= 5 ? COLORS?.white : COLORS?.gray1,
          })}

        </View>
        {/* // :
            // <View
            //   style={{
            //     ...styles?.row,
            //     backgroundColor: COLORS?.white,
            //     borderRadius: 17.1
            //   }}
            // >
            //   {previusstatusBtn(t('common:Preparing'), {
            //     borderTopLeftRadius: 17.1,
            //     borderBottomLeftRadius: 17.1
            //   })}
            //   {previusstatusBtn(t('common:Preparing'), {

            //   })}
            //   {previusstatusBtn(t('common:Preparing'), {

            //   })}
            //   {previusstatusBtn(t('common:Preparing'), {
            //     borderTopRightRadius: 17.1,
            //     borderBottomRightRadius: 17.1
            //   })}


            // </View>
            // } */}
      </View>
    }

    return <FlatList
      data={ordersData?.length > 0 ? ordersData : []}
      extraData={ordersData}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        return ordersData?.length > 0 ? header() : null
      }}
      ListEmptyComponent={() => {
        return <EmptyView
          image={images?.emptySearch}
          msg={t('common:noorder')}
          imageStyle={{
            tintColor: COLORS?.gray
          }}
        />
      }}
      onEndReached={() => {
        console.log('end.....', page)
        setPage(page + 1)
        if (data?.orderByStatus?.data?.length > 0) {
          setordersData(data?.orderByStatus?.data)
        }
      }}
    />
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS?.white
      }}>
      <StatusBar
        barStyle={'light-content'}
      />
      <MainHeader
        title={t('navigate:Orders')}
        leftIcon={I18nManager?.isRTL ? icons?.LArrow : icons?.RArrow}
        leftIconAction={() => { navigation.goBack() }}
      />
      <View style={{
        ...styles?.row,
        marginTop: 25,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between'

      }}>
        <Pressable
          style={{
            // marginRight: 12
          }}
          onPress={() => {
            setLoading(true)
            setPage(0)
            setStatus([0, 1, 2, 3])
            settab('Upcomming')
          }}
        >
          <Text style={{
            ...FONTS?.h3, color: tab == 'Upcomming' ?
              COLORS?.primary :
              COLORS?.txtgray, alignSelf: 'flex-start'
          }}>
            {t('common:Upcomming')}
          </Text>
          <View
            style={{
              ...styles?.line,
              backgroundColor: tab == 'Upcomming' ? COLORS?.primary : COLORS?.txtgray
            }}
          />
        </Pressable>
        <Pressable
          style={{
            // marginLeft: 12
          }}
          onPress={() => {
            setLoading(true)
            setPage(0)
            setStatus([4, 5])
            settab('Previous')
          }}
        >
          <Text style={{ ...FONTS?.h3, color: tab == 'Previous' ? COLORS?.primary : COLORS?.txtgray, alignSelf: 'flex-start' }}>
            {t('common:Previous')}
          </Text>
          <View
            style={{
              ...styles?.line,
              backgroundColor: tab == 'Previous' ? COLORS?.primary : COLORS?.txtgray
            }}
          />
        </Pressable>

      </View>


      {Loading ?
        <ActivityIndicator style={{ marginTop: SIZES?.padding }} size={'large'} />
        :
        ListOfOrders()}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txt: {
    color: COLORS?.txtgray,
    fontSize: 16,
    marginHorizontal: 8
  },
  line: {
    width: 160,
    backgroundColor: COLORS?.primary,
    height: 3,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 16,
    tintColor: COLORS?.appyellow
  },
  PressableIcon: {
    backgroundColor: COLORS?.primary,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  cartView: {
    marginBottom: 16,
    backgroundColor: COLORS?.gray,
    height: 139,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  xsicon: {
    width: 13,
    height: 13,
    marginRight: 3
  },
  statusBtn: {
    backgroundColor: COLORS?.primary,
    borderRadius: 17.1,
    height: 33,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start'
  }
})

export default DriverOrders;
