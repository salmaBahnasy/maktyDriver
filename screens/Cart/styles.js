import {
  StyleSheet
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';


const styles = StyleSheet.create({


  row: {
    flexDirection: 'row',
    alignItems: 'center',

  },

  error: {
    ...FONTS?.body4,
    color: COLORS?.red,
    marginHorizontal: 24
  },
  itemView: {
    backgroundColor: COLORS?.gray,
    height: 123,
    marginHorizontal: 14,
    padding: 16,
    flexDirection: 'row',
    marginVertical: 4,
    borderRadius: 10
  },
  itemImg: {
    width: 89,
    height: 85,
    borderRadius: 9
  },
  smallIcon: {
    height: 32,
    width: 32
  },
  txt: {
    ...FONTS?.body3, fontSize: 18,
    alignSelf: 'flex-start'
  },
  footerRowItem: {
    flex: 1, justifyContent: 'space-between',
    position: 'absolute', width: '100%',
    bottom: 0,
  },
  headerTitle: {
    ...FONTS?.h2, color: COLORS?.appBlack, fontSize: 16, marginBottom: 16, alignSelf: 'flex-start'

  },
  addressView: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: COLORS?.gray,
    marginHorizontal: 17,
    borderRadius: 19,
    marginVertical: 4
  },
  selectIcon: {
    width: 22,
    height: 22,
    marginRight: 5,
    tintColor: COLORS?.primary
  },
  addresstxt: {
    ...FONTS?.body3,
    fontSize: 16,
    lineHeight: 32,
    alignSelf:'flex-start'
  },
  txtType: {
    ...FONTS?.h2,
    fontSize: 16,
    color: COLORS?.primary
  },
  Addressheader: {
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8
  },
  orderDetailstxt: {
    ...FONTS?.h2,
    fontSize: 16,
    lineHeight: 32,
    color: COLORS?.appBlack,
    marginHorizontal: 16,
    alignSelf:'flex-start'
  },
  xsmallIcon: {
    height: 16,
    width: 16,
    tintColor: COLORS?.appyellow,
  },
  stepView: {
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },
  sdtext: {
    ...FONTS?.body6,
    fontSize: 10,
    color: COLORS?.gray1
  },
  resetView: {
    backgroundColor: COLORS?.gray,
    borderRadius: 10,
    padding: 16,
    marginTop: 24
  },
  Allsteps: {
    backgroundColor: COLORS?.white,
    height: 38,
    borderRadius: 19,
    marginBottom: 16,
  }
})

export default styles;