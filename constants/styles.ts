import { Dimensions, PixelRatio } from 'react-native'

const { width } = Dimensions.get('screen')

export const wp = (widthPercent: number) => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent)
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100)
}

export const ICON = {
  XS: wp(3),
  S: wp(4),
  M: wp(6),
  L: wp(8),
  XL: wp(10),
  XXL: wp(12),
  XXXL: wp(14),
  XXXXL: wp(16),
} as const

const PALETTE = {
  gray0: '#FFFFFF',
  gray50: '#F7FAFC',
  gray100: '#EDF2F7',
  gray200: '#E2E8F0',
  gray300: '#CBD5E0',
  gray400: '#A0AEC0',
  gray500: '#718096',
  gray600: '#4A5568',
  gray700: '#2D3748',
  gray800: '#1A202C',
  gray900: '#171923',
  gray1000: '#000000',

  red50: '#FFF5F5',
  red100: '#FED7D7',
  red200: '#FEB2B2',
  red300: '#FC8181',
  red400: '#F56565',
  red500: '#E53E3E',
  red600: '#C53030',
  red700: '#9B2C2C',
  red800: '#822727',
  red900: '#63171B',

  yellow50: '#FFFFF0',
  yellow100: '#FEFCBF',
  yellow200: '#FAF089',
  yellow300: '#F6E05E',
  yellow400: '#ECC94B',
  yellow500: '#D69E2E',
  yellow600: '#B7791F',
  yellow700: '#975A16',
  yellow800: '#744210',
  yellow900: '#5F370E',

  green50: '#F0FFF4',
  green100: '#C6F6D5',
  green200: '#9AE6B4',
  green300: '#68D391',
  green400: '#48BB78',
  green500: '#38A169',
  green600: '#2F855A',
  green700: '#276749',
  green800: '#22543D',
  green900: '#1C4532',
}

export const COLOR = {
  white: PALETTE.gray0,
  black: PALETTE.gray1000,

  primaryMain: PALETTE.gray600,
  primaryLight: PALETTE.gray500,
  primaryDark: PALETTE.gray700,
  primaryBlack: PALETTE.gray800,
  primaryWhite: PALETTE.gray300,

  accentMain: PALETTE.red600,
  accentLight: PALETTE.red500,
  accentDark: PALETTE.red700,
  AccentVeryDark: PALETTE.red800,
  AccentVeryLight: PALETTE.red300,

  errorMain: PALETTE.red400,
  errorLight: PALETTE.red300,
  errorDark: PALETTE.red500,
  errorVeryDark: PALETTE.red700,

  warningMain: PALETTE.yellow400,
  warningLight: PALETTE.yellow300,
  warningDark: PALETTE.yellow500,
  warningVeryDark: PALETTE.yellow700,

  successMain: PALETTE.green400,
  successLight: PALETTE.green300,
  successDark: PALETTE.green500,
  successVeryDark: PALETTE.green700,
} as const

export const SPACING = {
  XXXS: wp(0.5),
  XXS: wp(1),
  XS: wp(1.5),
  S: wp(2),
  M: wp(3.5),
  L: wp(5),
  XL: wp(8),
  XXL: wp(12),
} as const

export const FONT = {
  XS: wp(3),
  S: wp(3.5),
  M: wp(4),
  L: wp(5),
  XL: wp(6),
  HEADING_XS: wp(8),
  HEADING_S: wp(9),
  HEADING_M: wp(12),
  HEADING_L: wp(14),
  HEADING_XL: wp(14),
} as const

export const FONT_WEIGHT = {
  thin: 'Lato-Thin',
  thinItalic: 'Lato-ThinItalic',
  light: 'Lato-Light',
  lightItalic: 'Lato-LightItalic',
  regular: 'Lato-Regular',
  italic: 'Lato-Italic',
  bold: 'Lato-Bold',
  boldItalic: 'Lato-BoldItalic',
  black: 'Lato-Black',
  blackItalic: 'Lato-BlackItalic',
}
