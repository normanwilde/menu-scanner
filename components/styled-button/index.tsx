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
  loading?: boolean
  title: string
}

const textColors: Record<ButtonTypes, keyof typeof COLOR> = {
  filled: 'textPrimary',
  outlined: 'backgroundPrimary',
  disabled: 'textPrimary',
}

export const StyledButton = ({
  title,
  type = 'filled',
  loading,
  ...props
}: ButtonProps) => {
  /* Variables */

  const buttonType = useMemo(
    () => (loading ? types['disabled'] : types[type]),
    [loading, type]
  )

  const style = useMemo(
    () => [styles.container, buttonType, props.style],
    [props.style, type, loading, buttonType]
  )

  return (
    /*
      Should add an extra wrapper View to override the default native behaviour
      https://github.com/software-mansion/react-native-gesture-handler/issues/477
    */
    <View style={style}>
      <RectButton
        {...props}
        style={styles.wrapper}
        enabled={!loading && props.enabled}
      >
        {loading ? (
          <View
            style={{
              minHeight: 24,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size={FONT.M} color="white" />
          </View>
        ) : (
          <StyledText size="L" weight="black" color={textColors[type]}>
            {title}
          </StyledText>
        )}
      </RectButton>
    </View>
  )
}

const types = StyleSheet.create<Record<ButtonTypes, ViewStyle>>({
  filled: {
    backgroundColor: COLOR.accentPrimary,
  },
  outlined: {
    backgroundColor: COLOR.textPrimary,
  },
  disabled: {
    backgroundColor: COLOR.backgroundPrimary,
    borderWidth: StyleSheet.hairlineWidth,
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
