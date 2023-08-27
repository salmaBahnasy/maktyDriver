
export default graphql(
    gql`
      mutation login($email: String!, $password: String!) {
        login(input:{email: $email, password: $password}) {
          token
        }
      }
    `,
    {
      props: ({ mutate }) => ({
        login: (email, password) => mutate({ variables: { email, password } }),
      }),
    },
  )(Register);