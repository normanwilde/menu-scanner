import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, View, StyleSheet, Dimensions } from 'react-native'
import { RootStackParamList } from '../../typings/navigators'
import { Entypo } from '@expo/vector-icons'
import { COLOR, SPACING } from '../../constants/styles'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('screen')

// 428
// 926
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function CameraIcon() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'MenuGallery'>
    >()

  /* Handlers */
  const goToCamera = () => {
    navigation.navigate('Camera')
  }

  const offset = useSharedValue({ x: 0, y: 0 })
  const savedVerticalOffset = useSharedValue({ x: 0, y: 0 })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(offset.value.x) },
        { translateY: withSpring(offset.value.y) },
      ],
    }
  })

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + savedVerticalOffset.value.x,
        y: e.translationY + savedVerticalOffset.value.y,
      }
    })
    .onEnd((e) => {
      const endingVerticalOffset = Math.min(0, e.translationY)

      console.log(endingVerticalOffset)
      savedVerticalOffset.value = {
        x: 0,
        y: offset.value.y,
      }
      offset.value = {
        ...offset.value,
        x: 0,
      }
    })

  return (
    <GestureDetector gesture={panGesture}>
      <AnimatedPressable
        onPress={goToCamera}
        style={[styles.container, animatedStyles]}
      >
        <Entypo name="camera" size={SPACING.XL} color="black" />
      </AnimatedPressable>
    </GestureDetector>
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
    right: SPACING.XL,
    bottom: SPACING.XXL,
  },
})
