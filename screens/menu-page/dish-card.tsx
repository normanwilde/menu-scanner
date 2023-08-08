import { Pressable, Text, View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { useMenu } from '../../contexts/menu'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { IMenuItem } from '../../typings/data'

type Props = {
  menuItem: IMenuItem
}

export default function DishCard({ menuItem }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: menuItem.images[0] }} style={styles.image} />
      <View>
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
})
