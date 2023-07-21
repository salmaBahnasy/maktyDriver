import {
    StyleSheet
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

const styles = StyleSheet.create({
    imageContainer: {
        width: SIZES.width,
        height: SIZES.height
    },
    logo: {
        width: 136,
        height: 173,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 100,
        marginBottom: 50
    },
    BoldPrimaryText: {
        fontSize: 26,
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: 'bold',

        fontFamily: 'Tajawal-Bold'
    },
    thinPrimaryText: {
        fontSize: 16,
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: 'normal',
        fontFamily: 'Tajawal-Regular'

    },
    signUpView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 36
    },
    grayTxt: {
        color: COLORS.gray1, fontSize: 16
    },
    orangTxt:{
        color: COLORS.appyellow, fontSize: 16
    },
    BoldPrimaryTextSmall: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: 'bold',

        fontFamily: 'Tajawal-Bold'
    },
    error: {
        ...FONTS?.body6,
        color: COLORS?.red,
        textAlign: 'center',
        marginBottom: 24
    },
    forgetPasswordView: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row', alignItems: 'center',
        marginBottom: 17
    },
    container: {
        flex: 1
    },
    otpView: {
    //    paddingHorizontal:33,
       justifyContent:'space-around',
       width:'90%',
       alignSelf:'center',
       marginBottom:33

    },
    otpInput:{
        margin:4,
        backgroundColor:COLORS?.gray,
        borderRadius:18,
        flex:1,
        height:SIZES?.width/8,
        width:SIZES?.width/8,
        color:COLORS?.gray1,
        ...FONTS?.h3,
        textAlign:'center'
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    center:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    }
})


export default styles