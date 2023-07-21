import { gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CreateOrder = gql`
mutation createOrder($input:CreateOrderInput!) {
  createOrder(input:$input) {
    result{
      error
      status

      }
      data{
        id
        name
        }
  }
}
`;
// message
// update
// valid
// ....
// mobile
// email
// details
// from_latitude
// from_longitude
// from_address
// to_latitude
// to_longitude
// to_address
// status
// delivery_cost
// user
// delegate
export const ValidateUserOnCoupon = gql`
mutation validateUserOnCoupon($input:validateUserOnCouponInput!) {
  validateUserOnCoupon(input:$input) {
      error
      status
      message
      
  }
}
`;

export const EstimateDeliveryPrice = gql`
mutation estimateDeliveryPrice($input:estimateDeliveryPriceInput!) {
  estimateDeliveryPrice(input:$input) 
}
`;

export const FindDelegateOrder = gql`
mutation findDelegateOrder($input:findDelegateOrderInput!) {
  findDelegateOrder(input:$input) {
      id
      name
      email
      mobile
      lang
      gender
      birth_date
      imagePath
      noOrders
      rate
  }
}
`;

export const ConfirmDelegateOrder = gql`
mutation confirmDelegateOrder($input:confirmDelegateOrderInput!) {
  confirmDelegateOrder(input:$input) {
    error
    status
    message
  }
}
`;
export const CancelOrder = gql`
mutation cancelOrder($input:cancelOrderInput!) {
  cancelOrder(input:$input) {
    error
    status
    message
  }
}
`;


export const SendMessageById = gql`
mutation sendMessage($input:sendMessageInput!) {
  sendMessage(input:$input) {
    error
    status
    message
  }
}
`;


export const ChatByOrderId = gql`
query chatByOrderId($order_id: Int!
  $page: Int!){
    chatByOrderId(order_id:$order_id,page:$page){
      data{
        created_at
        id
      message
      voice
      seen
      status
      from
      imagePath
      order {
        id
        name
        mobile
        email
        details
        from_latitude
        from_longitude
        from_address
        to_latitude
        to_longitude
        to_address
        status
        delivery_cost
      
      }
      user {
        id
        name
        email
        mobile
        lang
        gender
        birth_date
        imagePath
        noOrders
        rate
      }
    }
}}`;

export const clearAsnc = function () {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiRemove(['pickUpFrom', 'deliveTo'])
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(['pickUpFrom', 'deliveTo']))
      .then(() => {
        console.log('All Keys removed')
        resolve(true)
      });
  })
}