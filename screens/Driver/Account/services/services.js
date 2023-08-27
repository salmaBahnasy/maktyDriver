import { gql } from "@apollo/client";

export const me = gql`
query {
me{
    id
    name
    email
    mobile
    gender
    birth_date

}}`;

export const updateProfile_GQL = gql`
mutation updateProfile($input:UpdateProfileInput!) {
    updateProfile(input:$input ) {
    error
    status
    message
    update
  }
}
`;

export const updatePassword_GQL = gql`
mutation updatePassword($input:UpdatePasswordInput!) {
    updatePassword(input:$input) {
    status
    message
  }
}
`;