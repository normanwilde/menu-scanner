import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native'
import { RootStackParamList } from '../../typings/navigators'
import { Entypo } from '@expo/vector-icons'
import { COLOR, SPACING } from '../../constants/styles'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useHeaderHeight } from '@react-navigation/elements'
import { useState } from 'react'
const { width, height } = Dimensions.get('screen')

// 428
// 926
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function CameraIcon() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'MenuGallery'>
    >()
  const headerHeight = useHeaderHeight()
  const [iconHeight, setIconHeight] = useState(0)

  /* Handlers */
  const goToCamera = () => {
    navigation.navigate('Camera')
  }

  const onLayout = (e: LayoutChangeEvent) => {
    setIconHeight(e.nativeEvent.layout.height)
  }

  const offset = useSharedValue({ x: 0, y: 0 })
  const savedVerticalOffset = useSharedValue({ x: 0, y: 0 })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
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
    .onEnd(() => {
      const endingVerticalOffset = Math.min(
        0,
        Math.max(
          offset.value.y,
          headerHeight + iconHeight + SPACING.XXL + SPACING.XL - height
        )
      )

      savedVerticalOffset.value = {
        ...savedVerticalOffset.value,
        y: endingVerticalOffset,
      }
      offset.value = {
        ...offset.value,
        x: withSpring(0),
        y: withSpring(endingVerticalOffset),
      }
    })

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyles}>
        <Pressable
          onLayout={onLayout}
          onPress={goToCamera}
          style={({ pressed }) => [
            styles.container,
            { backgroundColor: pressed ? COLOR.errorDarker : COLOR.errorDark },
          ]}
        >
          <Entypo name="camera" size={SPACING.XL} color="black" />
        </Pressable>
      </Animated.View>
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
