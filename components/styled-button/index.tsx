import React, { useMemo } from 'react'

import type { RectButtonProps } from 'react-native-gesture-handler'
import type { ViewStyle } from 'react-native'

import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { StyledText } from '../styled-text'
import { COLOR, FONT, SPACING } from '../../constants/styles'

export type ButtonTypes = 'filled' | 'outlined' | 'disabled'

type ButtonProps = RectButtonProps & {
  type?: ButtonTypes
  title: string
  enabled?: boolean
}

const textColors: Record<ButtonTypes, keyof typeof COLOR> = {
  filled: 'textPrimary',
  outlined: 'textInverse',
  disabled: 'textInverse',
}

export const StyledButton = ({
  title,
  type = 'filled',
  enabled = true,
  ...props
}: ButtonProps) => {
  /* Variables */

  const dynamicType: ButtonTypes = useMemo(
    () => (enabled ? type : 'disabled'),
    [enabled, type]
  )

  const buttonType = useMemo(
    () => (enabled ? types[type] : types['disabled']),
    [type, enabled]
  )

  const style = useMemo(
    () => [styles.container, buttonType, props.style],
    [props.style, buttonType]
  )

  return (
    /*
      Should add an extra wrapper View to override the default native behaviour
      https://github.com/software-mansion/react-native-gesture-handler/issues/477
    */
    <View style={style}>
      <RectButton {...props} style={styles.wrapper} enabled={enabled}>
        <StyledText size="L" weight="black" color={textColors[dynamicType]}>
          {title}
        </StyledText>
      </RectButton>
    </View>
  )
}

const types = StyleSheet.create<Record<ButtonTypes, ViewStyle>>({
  filled: {
    backgroundColor: COLOR.accentPrimary,
  },
  outlined: {
    backgroundColor: COLOR.backgroundInverse,
  },
  disabled: {
    backgroundColor: COLOR.backgroundTertiary,
  },
})

const styles = StyleSheet.create({
  container: {
    borderRadius: SPACING.XL,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.XS,
    paddingHorizontal: SPACING.L,
    paddingVertical: SPACING.M,
  },
})
