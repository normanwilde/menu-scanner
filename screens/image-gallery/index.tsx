import {
  FlatList,
  View,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  ViewToken,
} from 'react-native'
import { Image } from 'expo-image'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { StyledText } from '../../components'
import { useCallback, useState } from 'react'
import { COLOR, SPACING } from '../../constants/styles'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

const { width } = Dimensions.get('screen')

type Props = NativeStackScreenProps<RootStackParamList, 'ImageGallery'>

export default function ImageGallery({ route }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollOffset = useSharedValue(0)

  const { dish } = route.params

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (typeof viewableItems[0].index === 'number') {
        setCurrentIndex(viewableItems[0].index)
      }
    },
    [setCurrentIndex]
  )

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y
    },
  })

  const animatedStyles = useAnimatedStyle(() => {
    if (scrollOffset.value < 0) {
      return {
        transform: [
          { translateY: scrollOffset.value },
          { scale: 1 + -0.005 * scrollOffset.value },
        ],
      }
    }
    return {
      transform: [{ translateY: 0 }, { scale: 1 }],
    }
  })

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={3}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View>
        <Animated.FlatList
          horizontal
          data={dish.images}
          renderItem={({ item }) => renderItem(item.image)}
          keyExtractor={(item) => item.id}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            minimumViewTime: 0,
            viewAreaCoveragePercentThreshold: 50,
          }}
          style={animatedStyles}
        />
        <View style={styles.imageCount}>
          <StyledText style={{ color: 'white' }}>{`${currentIndex + 1}/${
            dish.images.length
          }`}</StyledText>
        </View>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.verticalLine} />
        <View style={styles.textContainer}>
          <StyledText size="HEADING_S" weight="bold">
            {dish.texts.originalText}
          </StyledText>
          <StyledText size="XL">{dish.texts.translatedText}</StyledText>
        </View>
      </View>
    </Animated.ScrollView>
  )
}

const renderItem = (imageUrl: string) => {
  return (
    <Image
      source={{ uri: imageUrl }}
      style={styles.image}
      onError={() => console.error(imageUrl)}
      placeholder={{
        uri: 'https://demofree.sirv.com/nope-not-here.jpg',
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  image: {
    width,
    height: width,
  },
  imageCount: {
    position: 'absolute',
    bottom: SPACING.S,
    right: SPACING.S,
    backgroundColor: COLOR.black,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingLeft: SPACING.M,
    paddingTop: SPACING.L,
    gap: SPACING.M,
    backgroundColor: COLOR.backgroundPrimary,
  },
  verticalLine: {
    backgroundColor: COLOR.accentPrimary,
    width: SPACING.XXS,
  },
  textContainer: {
    flex: 1,
  },
})
