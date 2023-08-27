import {
    StyleSheet
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';


const styles = StyleSheet.create({
    label: {
      ...FONTS?.body3,
      fontSize: 16,
      color: COLORS?.black,
      marginHorizontal: 24,
      marginBottom: 8,
      marginTop: 16,
      alignSelf:'flex-start'
    },
    mainView: {
      backgroundColor: COLORS?.white,
      borderRadius: 19,
      margin: 22,
      paddingBottom: 24
    },
    txt: {
      color: COLORS?.black,
      fontSize: 16,
      marginTop: 24
    },
    contactUs: {
      backgroundColor: COLORS?.white,
      height: 133,
      marginHorizontal: 16,
      marginVertical: 24, borderRadius: 16,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
    socialIcon: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
      marginVertical: 24,
      marginHorizontal: 12
    },
    error: {
      ...FONTS?.body5,
      color: COLORS?.red,
      textAlign: 'center',
      marginBottom: 15
  },
  })

  export default styles;