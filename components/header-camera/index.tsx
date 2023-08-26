import { Entypo } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackParamList } from '../../typings/navigators'
import { useNavigation } from '@react-navigation/native'
import { StyledText } from '../styled-text'
import { useMenu } from '../../contexts/menu'
import { COLOR, SPACING } from '../../constants/styles'

export function HeaderCamera() {
  /* Hooks */
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { state } = useMenu()
  /* Handlers */

  const goToCamera = () => {
    navigation.navigate('Camera')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToCamera}>
        <Entypo name="camera" size={24} color={COLOR.textPrimary} />
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
