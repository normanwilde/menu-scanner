import { Entypo } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'
import { RootStackParamList } from '../../typings/navigators'
import { useNavigation } from '@react-navigation/native'

export function HeaderIcon() {
  /* Hooks */
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  /* Handlers */
  const navigateToCamera = () => {
    navigation.navigate('Camera')
  }

  return (
    <Pressable onPress={navigateToCamera}>
      <Entypo name="camera" size={24} color="black" />
    </Pressable>
  )
}
