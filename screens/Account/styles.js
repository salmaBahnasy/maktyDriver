import {
  StyleSheet
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';


const styles = StyleSheet.create({
  smallIcon: {
    width: 20,
    height: 27
  },
  icon: {
    width: 24,
    height: 24
  },
  input: {
    marginVertical: 4,
    marginHorizontal: 24,
  },
  forgetPassView: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 12,
    marginHorizontal: 24,
  },
  avatar: {
    width: 140,
    height: 140,
    alignSelf: 'center'
  },
  changeAvatar: {
    backgroundColor: COLORS?.primary,
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -40, marginLeft: -60
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ckeckIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS?.primary
  },
  gheaderText:{
    ...FONTS?.h3,
    marginHorizontal: 24,
    marginTop: 8,
    alignSelf: 'flex-start',
    textTransform: 'capitalize'
  },
  gText:{
    ...FONTS?.body3,
    color: COLORS?.black,
    marginHorizontal: 8
  },
  genderView:{
    marginHorizontal: 24,
    marginVertical: 8,
  },
  error:{
    ...FONTS?.body6,
    color:COLORS?.red,
    fontSize:12,textAlign:'center',
  marginHorizontal:24
  },
  genderBtn:{
    borderRadius:6,
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    height:56
  }
})

export default styles;