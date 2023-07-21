import { gql } from "@apollo/client";
import { countryCodeEgypt } from "../../../constants/constVariable";
import {
  Linking,
  Platform
} from 'react-native';

export const ABOUTUS_GQL = gql`
query {
    aboutUs{
      twitter
      facebook
      instagram
      phone
}}`;

export const SENDFEEDBACK_GQL = gql`
mutation sendFeedback($input:sendFeedbackInput!) {
  sendFeedback(input:$input ) {
    status
    message
  }
}
`;

export const sendWhatsApp = (phone: any) => {
  let msg = " ";
  let phoneWithCountryCode = `${countryCodeEgypt}${phone}`;

  let mobile =
    Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
  if (mobile) {
    if (msg) {
      let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
      Linking.openURL(url)
        .then(data => {
          console.log("WhatsApp Opened");
        })
        .catch(() => {
          console.log("Make sure WhatsApp installed on your device");
        });
    } else {
      console.log("Please insert message to send");
    }
  } else {
    console.log("Please insert mobile no");
  }
};
