import {
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  SectionList,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { Image } from 'expo-image'
import { useMenu } from '../../contexts/menu'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { IMenuPage } from '../../typings/data'
import { StyledText } from '../../components'
import { CameraIcon } from './camera-icon'
import { SPACING } from '../../constants/styles'
import { groupMenuPages } from '../../utils/menu-grouper'
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useState } from 'react'

type Props = NativeStackScreenProps<RootStackParamList, 'MenuGallery'>

const { width } = Dimensions.get('screen')
const AnimatedScrollview = Animated.createAnimatedComponent(ScrollView)

export default function MenuGallery({ navigation }: Props) {
  const { state } = useMenu()
  const [content, setContent] = useState('a')
  const [enabled, setEnabled] = useState(true)

  const scrollOffset = useSharedValue(0)
  const sharedEnabled = useSharedValue(true)

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y === 0) {
      setEnabled(true)
    }
    if (e.nativeEvent.contentOffset.y < -100 && enabled) {
      setContent(content === 'a' ? 'b' : 'a')
      setEnabled(false)
    }
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y
      if (event.contentOffset.y === 0) {
        runOnJS(setEnabled)(true)
        sharedEnabled.value = true
      }
      if (event.contentOffset.y < -100 && sharedEnabled.value) {
        console.log('clicked')
        runOnJS(setContent)(content === 'a' ? 'b' : 'a')
        sharedEnabled.value = false
      }
    },
  })

  const goToMenu = (page: IMenuPage) => {
    navigation.navigate('MenuPage', { page: page })
  }

  const animatedStyles = useAnimatedStyle(() => {
    const extrapolation = {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.IDENTITY,
    }
    const changingOpacity = interpolate(
      scrollOffset.value,
      [-100.000001, -100, 0],
      [1, 0, 1]
    )
    return {
      opacity: sharedEnabled.value ? changingOpacity : 1,
    }
  })

  if (state.loading) {
    return <Text>Loading</Text>
  }

  if (state.pages && state.pages.length === 0 && !state.loading) {
    return (
      <View>
        <StyledText size="HEADING_S">Your menu gallery is empty.</StyledText>
        <StyledText size="L">
          Take a photo of a menu and wait for the results.
        </StyledText>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AnimatedScrollview
        onScroll={scrollHandler}
        scrollEventThrottle={3}
        style={animatedStyles}
      >
        {content === 'a' ? (
          <>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
            <StyledText>HELLO</StyledText>
          </>
        ) : (
          <>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
            <StyledText>GOODBYE</StyledText>
          </>
        )}
      </AnimatedScrollview>

      <CameraIcon />
    </View>
  )
}

const renderItem = (
  menuPage: IMenuPage,
  handlePress: (menuPage: IMenuPage) => void
) => {
  return (
    <Pressable
      onPress={() => handlePress(menuPage)}
      key={menuPage.photoUrl}
      style={styles.itemContainer}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: menuPage.photoUrl }} style={styles.image} />
      </View>
    </Pressable>
  )
}

const renderSectionHeader = ({
  section: { title },
}: {
  section: { title: string }
}) => {
  const date = new Date(Number(title))
  const visibleDate = date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  })
  return (
    <View style={styles.sectionHeaderWrapper}>
      <StyledText size="L">{visibleDate}</StyledText>
    </View>
  )
}

const ItemSeparatorComponent = () => {
  return <View style={styles.itemSeparator} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemSeparator: {
    // height: 20,
  },
  itemContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.L,
  },
  imageWrapper: {
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    width: width * 0.8,
    aspectRatio: 3 / 4,
  },
  sectionHeaderWrapper: {
    paddingHorizontal: SPACING.M,
  },
})
