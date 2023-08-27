import React, { useEffect, useState } from "react";
import {
    Image, Text, View, StyleSheet,ImageBackground
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons, COLORS, FONTS, SIZES, images } from "../constants";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import HomeDriver from "../screens/Driver/Home/Home";
import DriverNotification from "../screens/Driver/Notification/Notification";
import DriverAccount from "../screens/Driver/Account/Account";
import DriverOrders from "../screens/Driver/Orders/Orders";

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: Platform.OS === 'ios' ? "10%" : "8%",
        backgroundColor: COLORS.primary
    }
}

const DriverTabs = () => {
    const isfocus = useIsFocused()
    const { t } = useTranslation();



    return (
     
        <Tab.Navigator
            // tabBarOptions={tabOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.primary : COLORS.bggray;

                    switch (route.name) {
                        case "Home":
                            return (
                                <View style={{


                                }}>
                                    <Image
                                        source={icons.home}
                                        resizeMode="contain"
                                        style={[styles?.img, {
                                            tintColor: tintColor,
                                        }]} />
                                    <Text style={[{ ...styles?.txt }, ]}>
                                        {t('navigate:home')}
                                    </Text>
                                </View>
                            )

                        case "Orders":
                            return (
                                <View style={{


                                }}>
                                    <Image
                                        source={icons.orders}
                                        resizeMode="contain"
                                        style={[styles?.img, {
                                            tintColor: tintColor,
                                        }]}
                                    />
                                    <Text style={[{ ...styles?.txt }, ]}>
                                        {t('navigate:Orders')}

                                    </Text>
                                </View>


                            )
                        // case "DeliverDetails":
                        //     return (
                        //         <View
                        //             style={{
                        //                 marginTop: -50,
                        //                 backgroundColor: COLORS.primary,
                        //                 width:64,
                        //                 height:64,
                        //                 borderRadius:32,
                        //                 justifyContent:'center',
                        //                 alignContent:'center',
                        //                 alignItems:'center'
                        //             }}>
                        //             <Image
                        //                 source={icons.createOrder}
                        //                 resizeMode="contain"
                        //                 style={{
                        //                     width:'100%',
                        //                     height:'100%'
                        //                 }}
                        //             />
                        //             {/* <Text style={[{ ...styles?.txt }, ]}>
                        //                 {t('navigate:Orders')}

                        //             </Text> */}
                        //         </View>


                        //     )
                        case "Notification":
                            return (
                                <View style={{


                                }}>

                                    <Image
                                        source={icons.cart}
                                        resizeMode="contain"
                                        style={[styles?.img, {
                                            tintColor: tintColor,
                                        }]}
                                    />
                                    <Text style={[{ ...styles?.txt }, ]}>
                                        {/* {I18n.t('messages')} */}
                                        {t('common:note')}


                                    </Text>
                                </View>
                            )

                        case "Account":
                            return (
                                <View style={{


                                }}>

                                    <Image
                                        source={icons.account}
                                        resizeMode="contain"
                                        style={[styles?.img, {
                                            tintColor: tintColor,
                                        }]}
                                    />
                                    <Text style={[{ ...styles?.txt }, ]}>
                                        {/* {I18n.t('messages')} */}
                                        {t('navigate:Profile')}


                                    </Text>
                                </View>
                            )

                    }
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: "10%",
                   
                },
                

            })}
           
        >
            < Tab.Screen
                name="Home"
                component={HomeDriver}
                options={{ headerLeft: () => null, headerShown: false }}
            />
            <Tab.Screen
                name="Orders"
                component={DriverOrders}
                options={{ headerShown: false }}

            />
            {/* <Tab.Screen
                name="DeliverDetails"
                component={DeliverDetails}
                options={{ headerShown: false }}

            /> */}
            <Tab.Screen
                name="Notification"
                component={DriverNotification}
                options={{ headerShown: false }}

            />

            <Tab.Screen
                name="Account"
                component={DriverAccount}
                options={{ headerShown: false }}

            />

        </Tab.Navigator>
    )
}

export default DriverTabs;

const styles = StyleSheet.create({
    txt: {
        ...FONTS?.body6,
        color: COLORS?.black,
        textTransform: 'capitalize',
        flexShrink: 1,
        borderRadius: SIZES.radius,
        padding: SIZES.smallpading,
        marginTop: SIZES.smallpading

    },
    img: {
        width: 20,
        height: 20,
        alignSelf: 'center'
    },
})