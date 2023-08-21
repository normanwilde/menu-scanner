import { Pressable, Text, View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { IMenuItem } from '../../typings/data'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { useMenu } from '../../contexts/menu'
import Animated, { FadeIn, Layout, runOnJS } from 'react-native-reanimated'
import { useState } from 'react'
import EditModal from './edit-modal'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

type Props = {
  pageId: string
  menuItem: IMenuItem
}

export default function DishCard({ pageId, menuItem }: Props) {
  const { dispatch } = useMenu()
  const [showModal, setShowModal] = useState(false)
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'MenuPage'>>()

  const goToImageGallery = () => {
    navigation.navigate('ImageGallery', { dish: menuItem })
  }

  const showEditModal = () => {
    setShowModal(true)
  }

  const hideEditModal = () => {
    setShowModal(false)
  }

  const duplicateItem = () => {
    dispatch({
      type: 'DUPLICATE_ITEM',
      payload: { pageId, itemId: menuItem.id },
    })
  }

  const singleTapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      runOnJS(goToImageGallery)()
    })

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(duplicateItem)()
    })

  const longPressGesture = Gesture.LongPress().onStart(() => {
    runOnJS(showEditModal)()
  })

  const composedGesture = Gesture.Exclusive(
    longPressGesture,
    doubleTapGesture,
    singleTapGesture
  )

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View entering={FadeIn.duration(500)}>
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
        <EditModal
          isModalVisible={showModal}
          menuItem={menuItem}
          pageId={pageId}
          hideModal={hideEditModal}
        />
      </Animated.View>
    </GestureDetector>
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
