import { FontAwesome } from '@expo/vector-icons'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { COLOR, SPACING } from '../../constants/styles'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'

type Props = {
  resetWord: () => void
}

export function UndoIcon({ resetWord }: Props) {
  const onPress = () => {
    impactAsync(ImpactFeedbackStyle.Light)
    resetWord()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <FontAwesome name="undo" size={24} color={COLOR.textPrimary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.XL,
    flexDirection: 'row',
  },
})
