import { gql, useMutation } from '@apollo/client';


export const DriverREGISTER_GQL = gql`
mutation registerDelegate($input:DelegateRegisterInput!) {
  registerDelegate(input:$input ) {
    token,
    type
  }
}
`;

export const Upload = gql`
mutation upload($file:Upload!) {
  upload(file:$file )
}
`;

export const Nationalities = gql`
query {
  nationalities{
        id
        title
}}`;

export const Banks = gql`
query {
  banks{
        id
        title
}}`;

export const CarTypes = gql`
query {
  car_types{
        id
        title
}}`;

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const options = {
  "mediaType": 'photo',
  "quality": 0,
  "saveToPhotos": false
}
export const launchCameraFunc = () => {

  launchCamera(options, (res) => {
    console.log(res)
  });
}
export const launchImageLibraryFunc = () => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(options, (res) => {
      console.log({ res })
      if (res?.assets) {
        resolve({
          type: 'success',
          data: res?.assets[0]
        })
      } else {
        resolve({
          type: 'fail',
          data: res
        })
      }
    });
  }).catch(err => {
    console.log(err)
    resolve({
      type: 'fail',
      data: err
    })
  })
}

// "samar@gmail.com"
// "samar@123"