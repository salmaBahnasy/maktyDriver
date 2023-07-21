import { gql } from "@apollo/client";

export const ADDRESS_GQL = gql`
query addresses($page:Int!,$first:Int!){
    addresses(page:$page,first:$first){
        data{
          id
          address
          is_main
          title
          mobile
          city{
            id
            title
          }
          area{
            id
            title
          }
          notes
          latitude
          longitude
          type
          is_main
        }
}}`;

export const CITIES_GQL = gql`
query {
    cities{
        id
        title
}}`;

export const Area_GQL = gql`
query areas($city_id:Int!){
    areas(city_id:$city_id){
        id
        title
}}`;


export const ADDADDREESS_GQL = gql`
mutation addAddress($input:AddAddressInput!){
  addAddress(input:$input ) {
  message
  status   
  error 
}
}`


export const UPDATEADDREESS_GQL = gql`
mutation updateAddress($input:UpdateAddressInput!) {
  updateAddress(input:$input ) {
    message
    status   
    error 
  }
}
`;


export const DELETEADDREESS_GQL = gql`
mutation deleteAddress($input:DeleteAddressInput!) {
  deleteAddress(input:$input ) {
    message
    status   
    error 
  }
}
`;
export const USERMOBILE = gql`
query {
me{
    mobile
}}`;

export const setcityArrayFunction = (Array) => {
  return new Promise((resolve, reject) => {
    console.log({ Array })
    if (Array?.length > 0) {
      let data = []
      for (let i = 0; i < Array?.length; i++) {
        data[i] = {
          key: Array[i].id,
          value: Array[i].title
        }
      }
      console.log({ data })
      if (data) {
        resolve(data)
      }
    } else {
      resolve([])
    }
  })
}
export const setAreaFunction = function (Array) {
  return new Promise((resolve, reject) => {

    if (Array.length > 0) {
      let data1 = []

      for (let i = 0; i < Array?.length; i++) {
        data1[i] = {
          key: Array[i].id,
          value: Array[i].title
        }
      }
      console.log({ data1 })
      if (data1) {
        resolve(data1)

      }
    } else {
      resolve([])
    }
  })
}

