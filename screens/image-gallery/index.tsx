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
import { SPACING } from '../../constants/styles'

const { width } = Dimensions.get('screen')

type Props = NativeStackScreenProps<RootStackParamList, 'ImageGallery'>

export default function ImageGallery({ route }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { dish } = route.params

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (typeof viewableItems[0].index === 'number') {
        setCurrentIndex(viewableItems[0].index)
      }
    },
    [setCurrentIndex]
  )

  return (
    <View>
      <View>
        <FlatList
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
        />
        <View style={styles.imageCount}>
          <StyledText style={{ color: 'white' }}>{`${currentIndex + 1}/${
            dish.images.length
          }`}</StyledText>
        </View>
      </View>
      <StyledText size="XL">{dish.texts.originalText}</StyledText>
      <StyledText size="XL">{dish.texts.translatedText}</StyledText>
    </View>
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
  image: {
    width,
    height: width,
  },
  imageCount: {
    position: 'absolute',
    bottom: SPACING.S,
    right: SPACING.S,
    backgroundColor: 'black',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
})
