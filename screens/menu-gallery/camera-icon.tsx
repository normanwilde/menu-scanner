import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../typings/navigators'
import { Entypo } from '@expo/vector-icons'
import { COLOR, SPACING } from '../../constants/styles'

export function CameraIcon() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'MenuGallery'>
    >()

  /* Handlers */
  const goToCamera = () => {
    navigation.navigate('Camera')
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={goToCamera}>
        <Entypo name="camera" size={SPACING.XL} color="black" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.errorDark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    padding: SPACING.XL,
    borderRadius: 50,
    right: SPACING.L,
    bottom: SPACING.XXL,
  },
})
