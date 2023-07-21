import { gql } from "@apollo/client";

export const meeee = gql`
query {
brandById(id :10, governorate_id :3){
  title
  id

}}`;
// export const CONTINENT_QUERY = graphql(gql` query me{
//     name
//     id
//   }
// `;


// export const me = gql`
//   query ContinentQuery {
//     continents {
//       code
//       name
//     }
//   }
// `;
