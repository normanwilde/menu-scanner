import { Pressable, Text, View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { IMenuItem } from '../../typings/data'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  menuItem: IMenuItem
}

export default function DishCard({ menuItem }: Props) {
  return (
    <View style={styles.container}>
      {menuItem.images[0] ? (
        <Image source={{ uri: menuItem.images[0] }} style={styles.image} />
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
