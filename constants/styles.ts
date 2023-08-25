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
  white: '#FFFFFF',
  black: '#000000',

  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  gray950: '#030712',

  neutral50: '#fafafa',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  neutral950: '#0a0a0a',

  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red300: '#fca5a5',
  red400: '#f87171',
  red500: '#ef4444',
  red600: '#dc2626',
  red700: '#b91c1c',
  red800: '#991b1b',
  red900: '#7f1d1d',
  red950: '#450a0a',

  yellow50: '#fefce8',
  yellow100: '#fef9c3',
  yellow200: '#fef08a',
  yellow300: '#fde047',
  yellow400: '#facc15',
  yellow500: '#eab308',
  yellow600: '#ca8a04',
  yellow700: '#a16207',
  yellow800: '#854d0e',
  yellow900: '#713f12',
  yellow950: '#422006',

  green50: '#f0fdf4',
  green100: '#dcfce7',
  green200: '#bbf7d0',
  green300: '#86efac',
  green400: '#4ade80',
  green500: '#22c55e',
  green600: '#16a34a',
  green700: '#15803d',
  green800: '#166534',
  green900: '#14532d',
  green950: '#052e16',
}

export const COLOR = {
  white: PALETTE.white,
  black: PALETTE.black,

  textPrimary: PALETTE.neutral50,
  textSecondary: PALETTE.neutral100,
  textTertiary: PALETTE.neutral200,
  textQuaternary: PALETTE.neutral300,

  backgroundPrimary: PALETTE.neutral950,
  backgroundSecondary: PALETTE.neutral800,
  backgroundTertiary: PALETTE.neutral700,
  backgroundQuaternary: PALETTE.neutral600,

  accentPrimary: PALETTE.red500,
  accentSecondary: PALETTE.red600,
  accentTertiary: PALETTE.red700,
  accentQuaternary: PALETTE.red400,

  errorPrimary: PALETTE.red400,
  errorSecondary: PALETTE.red300,
  errorTertiary: PALETTE.red500,
  errorQuaternary: PALETTE.red700,

  warningPrimary: PALETTE.yellow400,
  warningSecondary: PALETTE.yellow300,
  warningTertiary: PALETTE.yellow500,
  warningQuaternary: PALETTE.yellow700,

  successPrimary: PALETTE.green400,
  successLight: PALETTE.green300,
  successTertiary: PALETTE.green500,
  successQuaternary: PALETTE.green700,
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
  HEADING_XS: wp(7),
  HEADING_S: wp(8),
  HEADING_M: wp(10),
  HEADING_L: wp(12),
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

export const THEME = {
  dark: true,
  colors: {
    primary: COLOR.textPrimary,
    background: COLOR.backgroundPrimary,
    card: 'rgb(255, 255, 255)',
    text: COLOR.textPrimary,
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
}
