import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { useMenu } from '../../contexts/menu'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { IMenuPage } from '../../typings/data'

type Props = NativeStackScreenProps<RootStackParamList, 'MenuGallery'>

export default function MenuGallery({ navigation }: Props) {
  const { state } = useMenu()

  console.log(JSON.stringify(state.pages))

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
    <View>
      {state.pages.map((page, index) => {
        return (
          <Pressable onPress={() => goToMenu(page)}>
            <Image
              key={page.photoUrl}
              source={{ uri: page.photoUrl }}
              style={{ width: 200, height: 300 }}
            />
          </Pressable>
        )
      })}
    </View>
  )
}
