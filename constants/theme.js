import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#552483",
    secondary: "#03d0ff",
    primary_500:"#06b6d4",
    whiteprimary:'#3f82b2',
    appyellow:'#fedd02',
    // colors
    black: "#1E1B26",
    primaryColor:"#1A202E",
    backgroundApp:"#F3F3F3",
    colorButton: "#8CC63F",
    colorForPassword: "#8CC63F",
    colorTextParah: '#5C616B',
    white: "#FFFFFF",
    lightGray: "#64676D",
    lightGray2: "#EFEFF0",
    lightGray3: '#D4D5D6',
    lightGray4: '#7D7E84',
    gray: "#f7f7f7",
    gray1: "#abadac",
    bggray:'#efefef',
    darkgray:'#f0f0f2',
    darkRed: "#31262F",
    lightRed: "#C5505E",
    darkBlue: "#22273B",
    lightBlue: "#424BAF",
    darkGreen: "#213432",
    lightGreen: "#00da4a",
    darkYellow:'#ffbe26',
    offWhite:'#fafafa',
    primary_opacity:'#144f7973',
    secondary_opacity:'#03d0ff3b',
    lightWhite:'#e7e7e7',
    sharebg:'#eceef2',
    graycolor:'#bfbfbf',
    bgGreen:'#9affda',
    lightbgGreen:'#dcfff2',
    orange:'#f99d31',
    textbg:'#d0e8b0',
    yellow:'#efd219',
    Y50:'#F3F2EA',
    Y300:'#8B7C2C',
    Y100:'#BCB385',
    btnY:'#ffd42a',

    B300:'#3F48C6',
    B400:'#5C616B',
    B40:'#E1E2E4',
    B50:'#ECEDF9',
    B20:'#F6F6F7',
    B10:"#FAFBFB",


    G400:'#628B2C',
    G50:'#F4F9EC',

    red:'#F15D1D',
    redOpacity:'#F15D1D66',
    noteBg:'#ebebeb',
    appBlack:'#2a2a2a',
    txtgray:"#8c8c8c"




};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding2: 36,
    smallpading:5,
    Mpading:10,
    padding20:20,
    padding15:15,

    padding3: 100,


    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 18,
    h3: 16,
    h4: 12,
    h5: 11,

    body1: 27,
    body2: 18,
    body3: 16,
    body4: 14,
    body5: 12,
    body6: 9,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Tajawal-regular", fontSize: SIZES.largeTitle, lineHeight: 55 ,color:'#000'},
    h1: { fontFamily: "Tajawal-Black", fontSize: SIZES.h1, lineHeight: 36,color:'#000' },
    h2: { fontFamily: "Tajawal-Bold", fontSize: SIZES.h2, lineHeight: 30 ,color:'#1A202E'},
    h3: { fontFamily: "Tajawal-Bold", fontSize: SIZES.h3, color:'#000'},
    h4: { fontFamily: "Tajawal-Bold", fontSize: SIZES.h4, color:'#000'},
    h5: { fontFamily: "Tajawal-Bold", fontSize: SIZES.h5, color:'#000' },

    body1: { fontFamily: "Tajawal-Regular", fontSize: SIZES.body1, lineHeight: 36 ,color:'#000'},
    body2: { fontFamily: "Tajawal-Regular", fontSize: SIZES.body2, lineHeight: 30,color:'#000' },
    body3: { fontFamily: "Tajawal-Regular", fontSize: SIZES.body3 ,color:'#000'},
    body4: { fontFamily: "Tajawal-Bold", fontSize: SIZES.body4 ,color:'#1A202E'},
    body5: { fontFamily: "Tajawal-Regular", fontSize: SIZES.body5 ,color:'#000'},
    body6: { fontFamily: "Tajawal-Regular", fontSize: SIZES.body6 ,color:'#000'},

};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;