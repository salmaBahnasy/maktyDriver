import {
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
        marginTop: 100,
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
        ...FONTS?.body4,
        color: COLORS.gray1,
        fontSize: 16
    },
    BoldPrimaryTextSmall: {
        color: COLORS.primary,
        fontSize: 16,

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
    }
})


export default styles