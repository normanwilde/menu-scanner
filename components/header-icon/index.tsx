import { Entypo } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../typings/navigators'
import { useNavigation } from '@react-navigation/native'
import { StyledText } from '../styled-text'
import { useMenu } from '../../contexts/menu'
import { SPACING } from '../../constants/styles'

export function HeaderIcon() {
  /* Hooks */
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { state } = useMenu()
  /* Handlers */

  const goToLanguageSelector = () => {
    navigation.navigate('LanguageSelector')
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={goToLanguageSelector}>
        <Entypo name="language" size={24} color="black" />
        <StyledText>{state.targetLanguage}</StyledText>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.XL,
    flexDirection: 'row',
  },
})
