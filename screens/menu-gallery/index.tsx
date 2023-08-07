import { Text, View } from 'react-native'
import { Image } from 'expo-image'
import { useMenu } from '../../contexts/menu'

export default function MenuGallery() {
  const { state } = useMenu()

  if (state.pages && state.pages.length === 0) {
    return <Text>No photos yet</Text>
  }
  if (state.loading) {
    return <Text>Loading</Text>
  }

  if (state.error) {
    return <Text>Error</Text>
  }

  return (
    <View>
      {state.pages.map((page) => {
        return (
          <Image
            key={page.photoUrl}
            source={{ uri: page.photoUrl }}
            style={{ width: 100, height: 100 }}
          />
        )
      })}
    </View>
  )
}
