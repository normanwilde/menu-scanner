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
  primary900: '#0036D9',
  primary800: '#0040DE',
  primary700: '#004EE4',
  primary600: '#365FF1',
  primary500: '#4D72F5',
  primary400: '#6688FF',
  primary300: '#A2B7FF',
  primary200: '#DEE5FF',
  primary100: '#EAEEFF',
  primary50: '#F5F8FE',

  secondary900: '#E8DF0A',
  secondary800: '#EEE50F',
  secondary700: '#F5EC07',
  secondary600: '#FCF31A',
  secondary500: '#FFF857',
  secondary400: '#FCFF76',
  secondary300: '#FDFF96',
  secondary200: '#FEFFCA',
  secondary100: '#FEFFD8',
  secondary50: '#FEFFE8',

  neutral900: '#000000',
  neutral850: '#0E0E0F',
  neutral800: '#191A1D',
  neutral700: '#404040',
  neutral600: '#575757',
  neutral500: '#A0A0A0',
  neutral400: '#BFBFBF',
  neutral300: '#E6E6E6',
  neutral200: '#F2F2F2',
  neutral100: '#FAFAFB',
  neutral0: '#FFFFFF',

  error900: '#B6041D',
  error800: '#C60A33',
  error700: '#D30F45',
  error600: '#E01C52',
  error500: '#E53D60',
  error400: '#EB6C86',
  error300: '#FFA3B6',
  error200: '#FFD4E0',
  error100: '#FFE8ED',
  error50: '#FEF8F9',

  warning900: '#F34613',
  warning800: '#F55620',
  warning700: '#F6662D',
  warning600: '#F77337',
  warning500: '#F98646',
  warning400: '#FDA270',
  warning300: '#FFBC97',
  warning200: '#FFE1D0',
  warning100: '#FFEEE4',
  warning50: '#FFF9F6',

  success900: '#014D18',
  success800: '#055D26',
  success700: '#096C34',
  success600: '#0C793F',
  success500: '#118C4F',
  success400: '#4AA879',
  success300: '#70BA95',
  success200: '#B3DAC7',
  success100: '#ECF6F1',
  success50: '#F5FAF8',
}

export const COLOR = {
  primaryMain: PALETTE.primary600,
  primaryLight: PALETTE.primary500,
  primaryDark: PALETTE.primary700,
  primaryDarker: PALETTE.primary800,

  secondaryMain: PALETTE.secondary400,
  secondaryLight: PALETTE.secondary300,
  secondaryDark: PALETTE.secondary500,

  textPrimary: PALETTE.neutral900,
  textSecondary: PALETTE.neutral700,
  textTertiary: PALETTE.neutral500,
  textQuaternary: PALETTE.neutral300,
  textDisabled: PALETTE.neutral600,

  backgroundPrimary: PALETTE.neutral900,
  backgroundSecondary: PALETTE.neutral800,
  backgroundTertiary: PALETTE.neutral700,
  backgroundDarkGrey: PALETTE.neutral850,
  backgroundWhite: PALETTE.neutral0,

  buttonPrimary: PALETTE.primary900,
  buttonSecondary: PALETTE.neutral0,
  buttonDisabled: PALETTE.neutral600,
  buttonError: PALETTE.error500,
  buttonTextPrimary: PALETTE.neutral0,
  buttonTextSecondary: PALETTE.neutral900,
  buttonTextDisabled: PALETTE.neutral500,

  inputBorder: PALETTE.neutral400,
  containerBorder: PALETTE.neutral800,
  radioButtonBorder: PALETTE.neutral0,

  errorMain: PALETTE.error400,
  errorLight: PALETTE.error300,
  errorDark: PALETTE.error500,
  errorDarker: PALETTE.error700,

  warningMain: PALETTE.warning400,
  warningLight: PALETTE.warning300,
  warningDark: PALETTE.warning500,
  warningDarker: PALETTE.warning700,

  successMain: PALETTE.success400,
  successLight: PALETTE.success300,
  successDark: PALETTE.success500,
  successDarker: PALETTE.success700,

  priceGreen: '#35E150',
  successTick: '#10BF2C',
  loadingIcon: '',
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
  thin: 'e-Ukraine-Thin', // 50???
  ultraLight: 'e-Ukraine-UltraLight', // 100???
  light: 'e-Ukraine-Light', // 200???
  regular: 'e-Ukraine-Regular', // 300
  medium: 'e-Ukraine-Medium', // 500
  bold: 'e-Ukraine-Bold', // 700
}
