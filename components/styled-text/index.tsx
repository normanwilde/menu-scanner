import { useMemo } from 'react'

/* Presentation Things */
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native'
import { COLOR, FONT } from '../../constants/styles'

type TextColors = keyof typeof COLOR

type TextSize = keyof typeof FONT

export type TextProps = RNTextProps & {
  color?: TextColors
  size?: TextSize
}

export const StyledText = ({
  color = 'textPrimary',
  size = 'M',
  ...props
}: TextProps) => {
  const style = useMemo(
    () => [sizes[size], colors[color], props.style],
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
