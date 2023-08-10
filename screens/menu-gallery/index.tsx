import {
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Image } from 'expo-image'
import { useMenu } from '../../contexts/menu'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MenuStackParamList } from '../../typings/navigators'
import { IMenuPage } from '../../typings/data'

type Props = NativeStackScreenProps<MenuStackParamList, 'MenuGallery'>

const { width } = Dimensions.get('screen')

export default function MenuGallery({ navigation }: Props) {
  const { state } = useMenu()
  console.log(state.pages[0])
  const goToMenu = (page: IMenuPage) => {
    navigation.navigate('MenuPage', { page: page })
  }

  if (state.loading) {
    return <Text>Loading</Text>
  }

  if (state.error) {
    return <Text>Error</Text>
  }

  if (state.pages && state.pages.length === 0) {
    return <Text>No photos yet</Text>
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.pages}
        renderItem={({ item }) => renderItem(item, goToMenu)}
        keyExtractor={(item) => item.photoUrl}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
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

const ItemSeparatorComponent = () => {
  return <View style={styles.itemSeparator} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemSeparator: {
    height: 20,
  },
  itemContainer: {
    alignItems: 'center',
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
})
