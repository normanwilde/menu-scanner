import { Pressable, Text, View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { IMenuItem } from '../../typings/data'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'

type Props = {
  menuItem: IMenuItem
}

export default function DishCard({ menuItem }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'MenuPage'>>()

  const goToImageGallery = () => {
    navigation.navigate('ImageGallery', { dish: menuItem })
  }
  return (
    <Pressable onPress={goToImageGallery}>
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
