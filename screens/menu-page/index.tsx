import { Pressable, FlatList, StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import { useMenu } from '../../contexts/menu'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import DishCard from './dish-card'
import { IMenuItem } from '../../typings/data'

type Props = NativeStackScreenProps<RootStackParamList, 'MenuPage'>

export default function MenuPage({ navigation, route }: Props) {
  const { page } = route.params
  return (
    <View style={styles.container}>
      <FlatList
        data={page.menuItems}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={ItemSeparatorComponent}
        style={styles.flatList}
        keyExtractor={(_item, index) => String(index)} // TODO: find better key
      />
    </View>
  )
}

const renderItem = (menuItem: IMenuItem) => {
  return <DishCard menuItem={menuItem} />
}

const ItemSeparatorComponent = () => {
  return <View style={styles.itemSeparator} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  flatList: {
    flex: 1,
  },
  itemSeparator: {
    height: 20,
  },
})
