import { FlatList, View, Dimensions, StyleSheet, Text } from 'react-native'
import { Image } from 'expo-image'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'

const { width } = Dimensions.get('screen')

type Props = NativeStackScreenProps<RootStackParamList, 'ImageGallery'>

export default function ImageGallery({ route }: Props) {
  const { dish } = route.params
  return (
    <View>
      <FlatList
        horizontal
        data={dish.images}
        renderItem={({ item }) => renderItem(item.image)}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <Text>{dish.texts.originalText}</Text>
      <Text>{dish.texts.translatedText}</Text>
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
})
