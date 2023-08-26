import { FontAwesome } from '@expo/vector-icons'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { COLOR, SPACING } from '../../constants/styles'

type Props = {
  resetWord: () => void
}

export function UndoIcon({ resetWord }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={resetWord}>
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
