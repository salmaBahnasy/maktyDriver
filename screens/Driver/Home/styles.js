import {
    StyleSheet
} from 'react-native';
import { COLORS, SIZES, FONTS  } from '../../../constants';

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
    catItem2:{
        margin: 6,
        width: '100%', 
        height: 220, 
        backgroundColor: COLORS?.gray,
        borderRadius: 6,
        padding:8,
        alignItems:'center',
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
        // backgroundColor: COLORS?.primary,
        // padding: SIZES?.padding,
        // borderBottomRightRadius: 20,
        // borderBottomLeftRadius: 20,
        height:145,
        width:'100%',
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
        alignSelf:'flex-start'
    },
    colortxt: {
        ...FONTS?.h3,
        fontSize: 14,
        color: COLORS?.appyellow,
        textDecorationLine: 'underline',
    },
    catflatList: {
        // marginHorizontal: 16,
        // alignSelf: 'center',
        // marginBottom: 20,
        width:'90%',
        alignSelf:'center'
    },
    circleimg:{
        width:58,height:58,borderRadius:29,margin:6,
        borderWidth:1
    },
    icon:{
        width:16,
        height:16,

    }


})


export default styles