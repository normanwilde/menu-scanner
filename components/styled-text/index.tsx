import { useMemo } from 'react'

/* Presentation Things */
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native'
import { COLOR, FONT, FONT_WEIGHT } from '../../constants/styles'

type TextColors = keyof typeof COLOR

type TextSize = keyof typeof FONT

type TextWeight = keyof typeof FONT_WEIGHT

export type TextProps = RNTextProps & {
  color?: TextColors
  size?: TextSize
  weight?: TextWeight
}

export const StyledText = ({
  color = 'primaryMain',
  size = 'M',
  weight = 'regular',
  ...props
}: TextProps) => {
  const style = useMemo(
    () => [sizes[size], colors[color], weights[weight], props.style],
    [props.style, color, size]
  )

  return (
    <RNText {...props} style={style}>
      {props.children}
    </RNText>
  )
}

const colors = StyleSheet.create<Record<TextColors, TextStyle>>(
  Object.keys(COLOR).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: { color: COLOR[curr as keyof typeof COLOR] },
    }),
    {} as Record<TextColors, TextStyle>
  )
)

const sizes = StyleSheet.create<Record<TextSize, TextStyle>>(
  Object.keys(FONT).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: { fontSize: FONT[curr as keyof typeof FONT] },
    }),
    {} as Record<TextSize, TextStyle>
  )
)

const weights = StyleSheet.create<Record<TextWeight, TextStyle>>(
  Object.keys(FONT_WEIGHT).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: { fontFamily: FONT_WEIGHT[curr as keyof typeof FONT_WEIGHT] },
    }),
    {} as Record<TextWeight, TextStyle>
  )
)
