import { Pressable, Text, View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { IMenuItem } from '../../typings/data'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { useMenu } from '../../contexts/menu'
import Animated, { FadeIn, Layout } from 'react-native-reanimated'

type Props = {
  pageId: string
  menuItem: IMenuItem
}

export default function DishCard({ pageId, menuItem }: Props) {
  const { dispatch } = useMenu()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'MenuPage'>>()

  const goToImageGallery = () => {
    navigation.navigate('ImageGallery', { dish: menuItem })
  }

  const duplicateItem = () => {
    dispatch({
      type: 'DUPLICATE_ITEM',
      payload: { pageId, itemId: menuItem.id },
    })
  }

  return (
    <Animated.View entering={FadeIn.duration(500)}>
      <Pressable onPress={goToImageGallery} onLongPress={duplicateItem}>
        <View style={styles.container}>
          {menuItem.images[0] ? (
            <Image
              source={{ uri: menuItem.images[0].thumbnail }}
              style={styles.image}
            />
          ) : (
            <View style={styles.iconWrapper}>
              <Ionicons name="fast-food" size={100} color="black" />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text>{menuItem.texts.originalText}</Text>
            <Text>{menuItem.texts.translatedText}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    marginHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconWrapper: {
    borderRadius: 50,
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
  },
})
