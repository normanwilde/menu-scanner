import { Entypo } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../typings/navigators'
import { useNavigation } from '@react-navigation/native'

export function HeaderIcon() {
  /* Hooks */
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  /* Handlers */

  const goToLanguageSelector = () => {
    navigation.navigate('LanguageSelector')
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={goToLanguageSelector}>
        <Entypo name="language" size={24} color="black" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 25,
    flexDirection: 'row',
  },
})
