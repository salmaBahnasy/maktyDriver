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
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import { COLORS, FONTS, icons, images } from '../../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainHeader from '../../comp/MainHeader';
import { useTranslation } from 'react-i18next';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import styles from './styles';

function OrdersDetails() {
  const { t } = useTranslation();
  const navigation = useNavigation()
  const route = useRoute()
  const [to_latitude, setto_latitude] = useState(JSON.parse(route?.params?.item?.to_latitude))
  const [to_longitude, setto_longitude] = useState(JSON.parse(route?.params?.item?.to_longitude))
  const [from_latitude, setfrom_latitude] = useState(JSON.parse(route?.params?.item?.from_latitude))
  const [from_longitude, settfrom_longitude] = useState(JSON.parse(route?.params?.item?.from_longitude))
  const [showVat, setshowVat] = useState(false)

  console.log("route", route?.params?.item)
  useEffect(() => {
    setto_latitude(JSON.parse(route?.params?.item?.to_latitude))
    setto_longitude(JSON.parse(route?.params?.item?.to_longitude))
    setfrom_latitude(JSON.parse(route?.params?.item?.from_latitude))
    settfrom_longitude(JSON.parse(route?.params?.item?.from_longitude))
  }, [])


  function cartItem() {
    const renderItem = ({ item, index }) => {
      return (
        <View style={{
          ...styles?.itemView
        }}>
          <Image
            source={images?.offerDefauteimage}
            style={{
              ...styles?.itemImg
            }}
          />
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={{ ...styles?.txt }}>
              Product name here
            </Text>
            <View style={{
              ...styles?.row,
              ...styles?.footerRowItem
            }}>
              <Text style={{ ...styles?.txt }}>
                35 Sar
              </Text>
              <View style={{ ...styles?.row, alignSelf: 'flex-end' }}>

                <Text style={{ ...styles?.txt, marginHorizontal: 14 }}>
                  x1
                </Text>

              </View>
            </View>
          </View>


        </View>
      )
    }
    return <FlatList
      data={[1, 1]}
      renderItem={renderItem}
      style={{
        backgroundColor: COLORS?.white,
        marginVertical: 8
      }}
      ListHeaderComponent={() => {
        return (
          <Text
            style={{
              ...styles?.orderDetailstxt
            }}
          >
            {t('common:Productsdetails')}
          </Text>
        )
      }}
    />
  }
  function resetView() {
    const renderItem = (key, val, style) => {
      return <View style={{
        ...styles?.row,
        justifyContent: 'space-between',
        marginVertical: 7
      }}>
        <Text style={{ ...FONTS?.h4, fontSize: 16, alignSelf: 'flex-start', ...style }}>{key}</Text>
        <Text style={{ ...FONTS?.h4, fontSize: 16, alignSelf: 'flex-start', ...style }}>{val}</Text>
      </View>
    }
    return <View>
      {renderItem(t('common:Sub_total'), "0 sar", { color: COLORS?.gray1 })}
      {renderItem(t('common:VAT'), "0 sar", { color: COLORS?.gray1 })}
      {renderItem(t('common:Promocode'), "0 sar", { color: COLORS?.gray1 })}
      {renderItem(t('common:total'), `${route?.params?.item?.delivery_cost} sar`, { color: COLORS?.appBlack })}
    </View>
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
        title={''}
        leftIcon={I18nManager?.isRTL ? icons?.LArrow : icons?.RArrow}
        leftIconAction={() => { navigation.goBack() }}
        style={{
          height: 62
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {
          route?.params?.item.status == 2 || route?.params?.item?.status?
          <View
          style={{
            backgroundColor: COLORS?.appyellow,
            ...styles?.row,
            justifyContent: 'space-between',
            padding: 16
          }}
        >
          <Text
            style={{
              ...FONTS?.h4,
            }}
          >
            {t('common:chts')}
          </Text>
          <Pressable
            style={{
              backgroundColor: COLORS?.primary,
              paddingHorizontal: 20.4,
              paddingVertical: 12,
              borderRadius: 20
            }}
            onPress={()=>{
                navigation.navigate('ChatScreen', {
                  item:route?.params?.item,
                  type: 'OrderDetails'
                })
              

            }}
          >
            <Text
              style={{
                ...FONTS?.h3,
                color: COLORS?.white
              }}
            >
              {t('common:Sendorder')}
            </Text>
          </Pressable>
        </View>:null}
        <View
          style={{
            ...styles?.row,
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 16
          }}
        >
          <View >
            <Text
              style={{
                ...FONTS?.h3,
                lineHeight: 32
              }}
            >{t('common:order')}</Text>
            <Text
              style={{ color: COLORS?.appBlack }}
            >{`#${route?.params?.item?.id}`}</Text>
          </View>
          {/* ..................... */}
          <View>
            <Text
              style={{
                ...FONTS?.h3,
                lineHeight: 32
              }}
            >{t('common:CreatedDate')}</Text>
            <Text
              style={{ color: COLORS?.appBlack }}
            >{
                route?.params?.item?.date
                // Sun,20/01/2023, 3:00PM'
              }</Text>
          </View>

        </View>

        <View
          style={{
            ...styles?.mapcontainer
          }}
        >
          <Text style={{ ...FONTS?.h3, color: COLORS?.primary }}>
            {t('common:cpl')}
          </Text>
          {from_latitude !==0 && from_longitude!==0 ?
            <MapView
              provider={Platform.OS == 'ios' ? MapView.PROVIDER_GOOGLE : PROVIDER_GOOGLE}
              style={{
               ...styles?.map,
              }}
              region={{
                latitude: from_latitude,
                longitude: from_longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
              initialRegion={{
                latitude: from_latitude,
                longitude: from_longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}

            >
              <Marker
                coordinate={{
                  latitude: from_latitude,
                  longitude: from_longitude,
                }}
                title={'موقعك الحالي'}
                draggable={false}
                onDragEnd={(e) => {
                  console.log('dragEnd', e.nativeEvent.coordinate)
                }}

              >
                <Image source={icons?.location}
                  style={{
                    ...styles?.smallIcon
                  }}
                />
              </Marker>
            </MapView>

            : <View style={{width:50,height:50,backgroundColor:'red'}}/>}
        </View>
        <View
          style={{
            ...styles?.mapcontainer
          }}
        >
          <Text style={{ ...FONTS?.h3, color: COLORS?.primary }}>
            {t('common:cdl')}
          </Text>
          {to_latitude!==0 && to_longitude!==0 ?
            <MapView
              provider={Platform.OS == 'ios' ? MapView.PROVIDER_GOOGLE : PROVIDER_GOOGLE}
              style={styles.map}
              onPress={(e) => {
                console.log(e)
                let cc = e.nativeEvent.coordinate
                console.log('onpres', e.nativeEvent.coordinate)
                // setto_latitude(e.nativeEvent.coordinate?.latitude)
                // setto_longitude(e.nativeEvent.coordinate?.longitude)
              }}
              region={{
                latitude: to_latitude,
                longitude: to_longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Marker
                coordinate={{
                  latitude: to_latitude,
                  longitude: to_longitude,
                }}
                title={'موقعك الحالي'}
                draggable={true}
                onDragEnd={(e) => {
                  console.log('dragEnd', e.nativeEvent.coordinate)
                }}

              >
                <Image source={icons?.location}
                  style={{
                    ...styles?.smallIcon
                  }}
                />
              </Marker>
            </MapView>

            : null}
        </View>
        <View
          style={{
            marginVertical: 8,
            width: '90%',
            alignSelf: 'center',
            ...styles?.row,
            justifyContent: 'space-between'

          }}
        >
          <Text style={{ ...FONTS?.h3, color: COLORS?.appBlack }}>
            {t('common:Orderdetails')}
          </Text>
          <Pressable
            onPress={() => {
              setshowVat(!showVat)
            }}
          >
            <Image
              source={!showVat ? icons?.downarrow : icons?.uparrow}
              style={{
                ...styles?.icons
              }}
            />
          </Pressable>
        </View>
        {showVat && <View style={{
          ...styles?.mapcontainer,
          // height: 283,
          borderRadius: 19
        }}>
          <Text style={{ ...FONTS?.h3 }}>
            {t('common:Paymentmethod')}
          </Text>
          <Text style={{ ...FONTS?.body4, color: COLORS?.gray1, lineHeight: 20, marginVertical: 8 }}>
            {t('common:cashondelivery')}
          </Text>
          <View
            style={{
              ...styles.line
            }}
          />
          {resetView()}
        </View>}
        <View style={{ ...styles?.mapcontainer }}>
          <Text
          style={{...FONTS?.h3,}}
          >{route?.params?.item?.details}</Text>
        </View>
        {/* {cartItem()} */}
      </ScrollView>
    </SafeAreaView>
  );
}



export default OrdersDetails;
