import { gql, useMutation } from '@apollo/client';

export const FORGETPASSWORD_GQL = gql`
mutation sendForgotPasswordCode($input:ForgotPasswordInput!) {
  sendForgotPasswordCode(input:$input ) {
    message
    status 
    error   
  }
}
`;

export const CONFIRMFORGETPASSWORD_GQL = gql`
mutation confirmForgotPasswordCode($input:ForgotPasswordCodeInput!) {
  confirmForgotPasswordCode(input:$input ) {
    message
    status   
    error 
  }
}
`;


export const RESETPASSWORD_GQL = gql`
mutation resetPasswordByCode($input:ResetPasswordByCodeInput!) {
  resetPasswordByCode(input:$input ) {
    message
    status   
    error 
  }
}
`;

