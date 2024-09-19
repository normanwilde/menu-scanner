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
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useHeaderHeight } from '@react-navigation/elements'
import { useState } from 'react'
import { impactAsync } from 'expo-haptics'

const { height } = Dimensions.get('screen')

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const ICON_SCALE = 1.2

export function CameraIcon() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'MenuGallery'>
    >()
  const headerHeight = useHeaderHeight()
  const [iconHeight, setIconHeight] = useState(0)

  /* Handlers */
  const goToCamera = () => {
    impactAsync
    navigation.navigate('Camera')
  }

  const onLayout = (e: LayoutChangeEvent) => {
    setIconHeight(e.nativeEvent.layout.height)
  }

  const verticalOffset = useSharedValue(0)
  const horizontalOffset = useSharedValue(0)
  const isInteracting = useSharedValue(false)
  const scale = useDerivedValue(() => {
    return isInteracting.value ? withTiming(ICON_SCALE) : withTiming(1)
  })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: horizontalOffset.value },
        { translateY: verticalOffset.value },
        { scale: scale.value },
      ],
    }
  })

  const animatedBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: isInteracting.value
        ? COLOR.accentPrimary
        : COLOR.accentSecondary,
      right: withTiming(
        isInteracting.value
          ? SPACING.XL + (ICON_SCALE - 1) * headerHeight
          : SPACING.XL
      ),
      bottom: withTiming(
        isInteracting.value
          ? SPACING.XXL - (ICON_SCALE - 1) * headerHeight
          : SPACING.XXL
      ),
    }
  })

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isInteracting.value = true
    })
    .onChange((e) => {
      horizontalOffset.value += e.changeX
      verticalOffset.value += e.changeY
    })
    .onEnd(() => {
      const endingVerticalOffset = Math.min(
        0,
        Math.max(
          verticalOffset.value,
          headerHeight + iconHeight + SPACING.XXL + SPACING.XL - height
        )
      )
      verticalOffset.value = withSpring(endingVerticalOffset)
      horizontalOffset.value = withSpring(0)
    })
    .onFinalize(() => {
      isInteracting.value = false
    })

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyles}>
        <AnimatedPressable
          onLayout={onLayout}
          onPress={goToCamera}
          style={[styles.container, animatedBackground]}
        >
          <Entypo name="camera" size={SPACING.XL} color="black" />
        </AnimatedPressable>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.accentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    padding: SPACING.XL,
    borderRadius: 50,
  },
})
