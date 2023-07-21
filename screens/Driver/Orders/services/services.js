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