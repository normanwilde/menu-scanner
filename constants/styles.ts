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

  accentMain: PALETTE.red600,
  accentLight: PALETTE.red500,
  accentDark: PALETTE.red700,
  accentVeryDark: PALETTE.red800,
  accentVeryLight: PALETTE.red300,

  backgroundMain: PALETTE.gray200,
  backgroundLight: PALETTE.gray100,
  backgroundVeryLight: PALETTE.gray50,
  backgroundDark: PALETTE.gray300,
  backgroundVeryDark: PALETTE.gray400,

  primaryMain: PALETTE.gray600,
  primaryLight: PALETTE.gray500,
  primaryVeryLight: PALETTE.gray500,
  primaryDark: PALETTE.gray700,
  primaryVeryDark: PALETTE.gray700,

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
