import { Entypo } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackParamList } from '../../typings/navigators'
import { useNavigation } from '@react-navigation/native'
import { StyledText } from '../styled-text'
import { useMenu } from '../../contexts/menu'
import { COLOR, SPACING } from '../../constants/styles'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
export function HeaderIcon() {
  /* Hooks */
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { state } = useMenu()

  /* Handlers */
  const goToLanguageSelector = () => {
    impactAsync(ImpactFeedbackStyle.Light)
    navigation.navigate('LanguageSelector')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToLanguageSelector}>
        <Entypo name="language" size={24} color={COLOR.textPrimary} />
        <StyledText size="S">{state.targetLanguage}</StyledText>
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
