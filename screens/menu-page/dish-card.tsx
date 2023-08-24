import { Pressable, Text, View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { IMenuItem } from '../../typings/data'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { useMenu } from '../../contexts/menu'
import Animated, { FadeIn, Layout, runOnJS } from 'react-native-reanimated'
import { useState } from 'react'
import EditModal from './edit-modal'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { COLOR, SPACING } from '../../constants/styles'
import { StyledText } from '../../components'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'

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

  const deleteItem = () => {
    dispatch({
      type: 'DELETE_ITEM',
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
    <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
      <GestureDetector gesture={composedGesture}>
        <View style={styles.dishContent}>
          {menuItem.images[0] ? (
            <Image
              source={{ uri: menuItem.images[0].thumbnail }}
              style={styles.image}
            />
          ) : (
            <View style={styles.iconWrapper}>
              <Ionicons
                name="fast-food"
                size={100}
                color={COLOR.backgroundPrimary}
              />
            </View>
          )}
          <View style={styles.textContainer}>
            <StyledText weight="bold" size="XL">
              {menuItem.texts.originalText}
            </StyledText>
            <StyledText size="L">{menuItem.texts.translatedText}</StyledText>
          </View>
        </View>
      </GestureDetector>
      <Menu>
        <MenuTrigger>
          <Entypo
            name="dots-three-vertical"
            size={SPACING.L}
            color={COLOR.textPrimary}
          />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: styles.menuOptionsContainer,
          }}
        >
          <MenuOptionItem text="Edit" icon="pencil" onSelect={showEditModal} />
          <MenuOptionItem
            text="Duplicate"
            icon="duplicate"
            onSelect={duplicateItem}
          />
          <MenuOptionItem
            text="Delete"
            icon="trash-bin"
            onSelect={deleteItem}
          />
        </MenuOptions>
      </Menu>
      <EditModal
        isModalVisible={showModal}
        menuItem={menuItem}
        pageId={pageId}
        hideModal={hideEditModal}
      />
    </Animated.View>
  )
}

const MenuOptionItem = ({
  text,
  icon,
  onSelect,
}: {
  text: string
  icon: keyof typeof Ionicons.glyphMap
  onSelect: () => void
}) => {
  return (
    <MenuOption onSelect={onSelect} style={styles.menuOptionContainer}>
      <Ionicons name={icon} size={24} color={COLOR.textPrimary} />
      <StyledText color="textPrimary">{text}</StyledText>
    </MenuOption>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.M,
    paddingHorizontal: SPACING.S,
  },
  dishContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.L,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconWrapper: {
    borderRadius: 50,
    backgroundColor: COLOR.textPrimary,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
  },
  menuOptionsContainer: {
    backgroundColor: COLOR.backgroundTertiary,
    overflow: 'hidden',
    borderRadius: SPACING.M,
    paddingHorizontal: SPACING.XS,
    paddingVertical: SPACING.XXS,
    borderWidth: SPACING.XXS,
    borderColor: COLOR.backgroundSecondary,
  },
  menuOptionContainer: {
    flexDirection: 'row',
    gap: SPACING.M,
    alignItems: 'center',
  },
})
