import {
    StyleSheet
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        height: SIZES?.height

    },
    catItem: {
        width: SIZES?.width / 3 - 21,
        height: 115,
        backgroundColor: '#e6dfed',
        margin: 5,
        borderRadius: 5,
        padding: 8
    },
    catItemTitle: {
        ...FONTS?.h3,
        color: COLORS?.primary,
        fontSize: 16,
        width: '60%'
    },
    catItemImage: {
        width: 36,
        height: 45,
        alignSelf: 'flex-end',
        resizeMode: 'contain',
        marginTop: 12
    },
    homeheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS?.primary,
        padding: SIZES?.padding,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    notIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    searchView: {
        marginHorizontal: 13,
        marginTop: -20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 66,
        marginRight: 9,
        backgroundColor: COLORS?.bggray,
        borderRadius: 19,
    },
    searchtext: {
        // textAlign: 'left',
        // alignContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
    },
    filterView: {
        width: 66,
        height: 66,
        borderRadius: 19,
        backgroundColor: COLORS?.bggray,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    filterIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    catheaderview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 16,
    },
    cattext: {
        ...FONTS?.h3,
        fontSize: 18,
        color: COLORS?.appBlack,
        alignSelf: 'flex-start'
    },
    colortxt: {
        ...FONTS?.h3,
        fontSize: 14,
        color: COLORS?.appyellow,
        textDecorationLine: 'underline',
    },
    catflatList: {
        marginHorizontal: 16,
        alignSelf: 'center',
        marginBottom: 20
    },
    avatar: {
        width: 53,
        height: 53,
        resizeMode: 'contain',
        borderRadius: 26.5,
        marginRight: 16
    },
    username: {
        ...FONTS?.body2,
        fontSize: 14,
        textTransform: 'uppercase',
        color: COLORS?.white
    },
    readyfororder: {
        ...FONTS?.h3,
        fontSize: 16,
        textTransform: 'uppercase',
        color: COLORS?.white,
        alignSelf: 'flex-start'
    },
    icons: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: COLORS?.yellow
    },
    xicon:{
        width: 16,
        height: 16,
        marginHorizontal: 5
    },
    locationtxt: {
        ...FONTS?.h2,
        fontSize: 14,
        textTransform: 'uppercase',
        color: COLORS?.yellow,
    },
    activeIndc: {
        backgroundColor: COLORS?.primary,
        width: 12, height: 12,
        transform: [{ rotateY: '45deg' }, { rotateZ: '45deg' }],
        borderRadius: 0
    },
    inactiveIndc: {
        backgroundColor: COLORS.bggray,
        width: 12, height: 12,
        transform: [{ rotateY: '45deg' }, { rotateZ: '45deg' }],
        borderRadius: 0
    },
    sliderimg: {
        borderRadius: 19,
        resizeMode: 'cover',
        height: 189,
        marginTop: 16,
        marginHorizontal: 15,
        width: SIZES?.width - 30,
    },
    banner: {
        marginHorizontal: 16,
        borderRadius: 19,
        backgroundColor: COLORS?.primary
    },
    bannervector: {
        width: 99,
        height: 107,
        marginTop: -15
    },
    bannertxt:{
        ...FONTS?.h3,
        color: COLORS.white,
        alignSelf: 'flex-start',
        fontSize: 16,
    },
    bannertxt1:{
        ...FONTS?.body3,
        color: COLORS.white,
        alignSelf: 'flex-start',
        fontSize: 16, marginVertical: 8
    }


})


export default styles