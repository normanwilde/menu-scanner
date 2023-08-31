import { View, StyleSheet, Text } from 'react-native'
import { COLOR, FONT, SPACING } from '../../constants/styles'

export function HeaderLogo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MENULENS</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.accentPrimary,
    borderRadius: SPACING.XL,
  },
  text: {
    fontFamily: 'RampartOne-Regular',
    fontSize: FONT.XL,
    fontWeight: '400', // For Android
    color: COLOR.textInverse,
    paddingHorizontal: SPACING.L,
    // paddingVertical: SPACING.XXS,
  },
})
