import {
    I18nManager,
    StyleSheet
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../constants';

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
        marginTop: 20,
        marginBottom: 50
    },
    BoldPrimaryText: {
        fontSize: 26,
        color: COLORS.primary,
        textAlign: 'center',

        fontFamily: 'Tajawal-Bold'
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
    BoldPrimaryTextSmall: {
        color: COLORS.primary,
        fontSize: 16,

        fontFamily: 'Tajawal-Bold',
    },
    error: {
        ...FONTS?.body5,
        color: COLORS?.red,
        textAlign: 'center',
        marginBottom: 15,
        textTransform:'capitalize'

    },
    SignUpbackbtn: {
        width: 40,
        height: 37,
        margin: 32
    },
    inputcontainer: {
        backgroundColor: COLORS?.gray,
        width: '90%',
        alignSelf: 'center',
        height: 56,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES?.base,
        marginBottom: 16,
        borderColor:COLORS?.red
    },
    text: {
        ...FONTS?.body3,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        color: COLORS?.gray1
    },
    icon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        tintColor: COLORS?.gray1
    },
    subtitle: {
        ...FONTS?.body2,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 16,
        textAlign: 'left'
        // alignSelf:'flex-start'
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
    avatar: {
        width: 140,
        height: 140,
        alignSelf: 'center',
        borderRadius: 70,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS?.gray,
        marginBottom: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    filesPlaceHolder: {
        flex: 1,
        height: 121,
        backgroundColor: COLORS?.gray,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius:6

    },
    uploadicon: {
        width: 30,
        height: 25
    },
    primetxt: {
        ...FONTS?.h3,
        color: COLORS?.primary,
        textAlign: 'center'
    },
    blacktxt: {
        ...FONTS?.h3,

    },
    acceptPriv: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        // marginBottom: 16,
        marginVertical: 28
    },
    checkIcon:{
        width: 16,
        height: 16,
        marginHorizontal: SIZES?.base
    },
    driveAvatar :{
        width: "60%",
        height: "60%",
        resizeMode: 'contain',
    }
})


export default styles