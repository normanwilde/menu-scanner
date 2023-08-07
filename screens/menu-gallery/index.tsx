import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  Pressable,
} from 'react-native'
import { Image } from 'expo-image'
import useImageFinder from '../../hooks/useImageFinder'
import { useState } from 'react'
import { useMenu } from '../../contexts/menu'
import useTextRecognizer from '../../hooks/useTextRecognizer'

export default function MenuGallery() {
  const { findImages, error, loading } = useImageFinder()
  const { detextText } = useTextRecognizer()
  const { state } = useMenu()
  console.log(state.pages[0]?.menuItems)

  if (state.pages && state.pages.length === 0) {
    return <Text>No images yet</Text>
  }

  return (
    <View>
      {state.pages.map((page) => {
        return (
          <Pressable onPress={() => detextText(page.base64)}>
            <Image
              key={page.photoUrl}
              source={{ uri: page.photoUrl }}
              style={{ width: 100, height: 100 }}
            />
          </Pressable>
        )
      })}
    </View>
  )
}
