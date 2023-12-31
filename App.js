import React, { useEffect, useState } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client';

import './Localization/IMLocalize';
import { client } from './constants/constVariable';

import Splash from './screens/Splash';

import ContactUs from './screens/ContactUs/ContactUs';
import Terms from './screens/Terms/Terms';
import AboutUS from './screens/AboutUS/AboutUS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForgetPassword from './screens/ForgetPassword/ForgetPassword';
import SendCode from './screens/ForgetPassword/SendCode';
import ResetPassword from './screens/ForgetPassword/ResetPassword';
import CommonQesttions from './screens/CommonQesttions/CommonQesttions';
import Search from './screens/Search/Search';
import LoginDriver from './screens/Driver/login/Login';
import SignUpForDriver from './screens/Driver/SignUp/SignUp';
import DriverRequst from './screens/Driver/SignUp/DriverRequst';
import JoinUsAsDriver from './screens/Driver/login/JoinUs';
import DriverTabs from './navigation/DriverTabs';
import DriverCategories from './screens/Driver/Home/Categories';
import EditDriverAccountData from './screens/Driver/Account/EditAccountData';
import Wallet from './screens/Driver/Wallet/Wallet';
import OrdersDetails from './screens/Driver/Orders/OrdersDetails';
import ChatScreen from './screens/Driver/Orders/Chat';
import TokenContext from './screens/global/Context';
import DriverOrders from './screens/Driver/Orders/Orders';



const Stack = createNativeStackNavigator();
// Initialize Apollo Client
// const httpLink = createHttpLink({
//   uri: 'https://api.makfy.net/public/graphql',
// });

// const authLink = setContext(async (_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = await AsyncStorage.getItem('token')
//   console.log({ token });

//   // 'Bearer 1762|cp4FcUZZRsHzUP5DVnfQkWiOGdi1zBdEcwD0xopr'
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//       "accept-language": I18nManager?.isRTL ? 'ar' : 'en'
//     }
//   }
// });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: authLink.concat(httpLink),
// });
// .............


// .............

function App() {
  const [type, setType] = useState('')
  const [token, setToken] = useState('')



  useEffect(() => {
    checkUserType()
  }, [])
  const checkUserType = () => {
    AsyncStorage.getItem('userType').then(usertype => {

      setType(usertype)
    })
    AsyncStorage.getItem('token').then(tk => {
      setToken(tk)
    })
  }
  return (

    <ApolloProvider client={client}>
      {/* <TokenContext value={token}> */}

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Splash"
            component={Splash} />


          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUpForDriver"
            component={SignUpForDriver} />

          <Stack.Screen
            options={{ headerShown: false }}
            name="DriverHome"
            component={DriverTabs} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AboutUS"
            component={AboutUS} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ContactUs"
            component={ContactUs} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Terms"
            component={Terms} />



          <Stack.Screen
            options={{ headerShown: false }}
            name="ForgetPassword"
            component={ForgetPassword} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SendCode"
            component={SendCode} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ResetPassword"
            component={ResetPassword} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CommonQesttions"
            component={CommonQesttions} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ChatScreen"
            component={ChatScreen} />


          <Stack.Screen
            options={{ headerShown: false }}
            name="Search"
            component={Search} />
          {/* driver */}
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginDriver"
            component={LoginDriver} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="JoinUsAsDriver"
            component={JoinUsAsDriver} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="DriverRequst"
            component={DriverRequst} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="DriverCategories"
            component={DriverCategories} />

          <Stack.Screen
            options={{ headerShown: false }}
            name="EditDriverAccountData"
            component={EditDriverAccountData} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Wallet"
            component={Wallet} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OrdersDetails"
            component={OrdersDetails} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Orders"
            component={DriverOrders} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </TokenContext> */}

    </ApolloProvider>

  );
}



export default App;
