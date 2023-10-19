import { gql } from "@apollo/client";

export const Order_GQL = gql`
  query orderByStatus($status:[Int!]!,$page:Int!){
    orderByStatus(status:$status,page:$page){
      data{
id,
name,
mobile,
email,
details,
from_latitude,
from_longitude,
from_address,
to_latitude,
to_longitude,
to_address,
status,
delivery_cost,

      }
}}`;

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
        id
      message
      voice
      seen
      status
      from
      imagePath
      created_at
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
}`;