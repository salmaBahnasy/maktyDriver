import { gql, useMutation } from '@apollo/client';

export const LOGIN_GQL = gql`
mutation login($input:LoginInput!) {
  login(input:$input ) {
    token,
    type
  }
}
`;


// "samar@gmail.com"
// "samar@123"