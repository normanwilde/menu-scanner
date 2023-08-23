import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Image } from 'expo-image'
import { IMenuItem } from '../../typings/data'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { useMenu } from '../../contexts/menu'
import Animated, { FadeIn, Layout } from 'react-native-reanimated'
import { CenteredLoader, StyledText } from '../../components'
import { TextInput } from 'react-native-gesture-handler'
import { useEffect, useRef, useState } from 'react'
import { COLOR, FONT, SPACING } from '../../constants/styles'
import useVision from '../../hooks/useVision'

type Props = {
  isModalVisible: boolean
  hideModal: () => void
  pageId: string
  menuItem: IMenuItem
}

export default function EditModal({
  isModalVisible,
  menuItem,
  hideModal,
  pageId,
}: Props) {
  const [text, setText] = useState(menuItem.texts.originalText)
  const { refetch } = useVision()
  const { state } = useMenu()

  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (isModalVisible) {
      inputRef.current?.focus()
    }
  }, [isModalVisible])

  const splitText = text.split(' ')

  const deleteWord = (itemIndex: number) => {
    const newText = text
      .split(' ')
      .filter((_value, index) => index !== itemIndex)
      .join(' ')
    setText(newText)
  }

  const onHideModal = () => {
    hideModal()
    setText(menuItem.texts.originalText)
  }

  const trimText = () => {
    setText(text.trim())
  }

  const saveEditedItem = async () => {
    const trimmedText = text.trim()
    await refetch(trimmedText, pageId, menuItem.id)
    onHideModal()
  }

  if (state.loading) {
    return <CenteredLoader />
  }

  return (
    <Modal visible={isModalVisible}>
      <SafeAreaView style={styles.outerContainer}>
        <ScrollView style={styles.container}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Pressable onPress={onHideModal}>
              <Entypo
                name="circle-with-cross"
                size={24}
                color={COLOR.textSecondary}
              />
            </Pressable>
            <Pressable onPress={saveEditedItem}>
              <Entypo name="save" size={24} color={COLOR.textSecondary} />
            </Pressable>
          </View>
          <StyledText size="HEADING_S" weight="black">
            {text}
          </StyledText>
          <View style={styles.sectionContainer}>
            <StyledText size="HEADING_XS" weight="bold">
              Edit content
            </StyledText>
            <View style={styles.inputWrapper}>
              <TextInput
                value={text}
                onChangeText={setText}
                multiline={true}
                style={styles.input}
                ref={inputRef}
                onBlur={trimText}
              />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <StyledText size="HEADING_XS" weight="bold">
              Delete words
            </StyledText>
            <View style={styles.bubbleContainer}>
              {splitText.map((word, index) => {
                return (
                  <Pressable
                    onPress={() => deleteWord(index)}
                    key={index}
                    style={styles.itemBubble}
                  >
                    <StyledText size="XL">{word}</StyledText>
                  </Pressable>
                )
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLOR.backgroundPrimary,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.L,
  },
  sectionContainer: {
    paddingBottom: SPACING.M,
  },
  inputWrapper: {},
  input: {
    borderColor: COLOR.accentTertiary,
    borderWidth: SPACING.XXS,
    borderRadius: SPACING.L,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
    justifyContent: 'center',

    fontSize: FONT.XL,
    backgroundColor: 'white',
  },
  bubbleContainer: {
    flexDirection: 'row',
    gap: SPACING.S,
    flexWrap: 'wrap',
  },
  itemBubble: {
    paddingVertical: SPACING.XS,
    paddingHorizontal: SPACING.S,
    backgroundColor: COLOR.accentQuaternary,
    borderRadius: SPACING.M,
  },
})
