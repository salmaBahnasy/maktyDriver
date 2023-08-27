import { gql } from "@apollo/client";

export const QUESTIONS_gql = gql`
query questions($page:Int!, $first : Int!){
    questions(page:$page,first:$first){
       data{
        title
        description
       } 
}}`;