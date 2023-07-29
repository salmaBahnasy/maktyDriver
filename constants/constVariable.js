export const countryCode = '+966'
export const countryCodeEgypt = '+2'
export const ImageURL = 'https://api.makfy.net/public/'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";
import { io } from "socket.io-client";

import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  I18nManager, Platform,
} from 'react-native';
import { useContext } from 'react';
import TokenContext from '../screens/global/Context';
// Initialize Apollo Client
const httpLink = createUploadLink({
  uri: 'https://api.makfy.net/public/graphql',
});


const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token')
  // console.log({ token });
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,

      authorization: token != null && token ? `Bearer ${token}` : "",
      "accept-language": I18nManager?.isRTL ? 'ar' : 'en'
    }
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),

});
// export const socketFunction = async () => {
//   const token = await AsyncStorage.getItem('token')
//   console.log({ token });
//   const socket = io("http://185.148.147.83:3002", {
//     transports: ["websocket"],
//     autoConnect: false,
//     reconnection: false,
//     auth: {
//       // how to pass token here from AsyncStorage   
//       token: token //'147|MA2oZQrnB3tFg3R9UbfrAXnLoYVQtNr6l0dpgVlf'
//     }
//   })
//   return socket
// }
// const token = useContext(TokenContext);
// console.log({token})
export const socket = io("http://185.148.147.83:3002",
  {
    transports: ["websocket"],
    autoConnect: false,
    reconnection: false,
    auth: {
      // how to pass token here from AsyncStorage   
      // token: "token"
    }
    //'147|MA2oZQrnB3tFg3R9UbfrAXnLoYVQtNr6l0dpgVlf'
  }
);


