import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native'
import { Image } from 'expo-image'
import { IMenuItem } from '../../typings/data'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { useMenu } from '../../contexts/menu'
import Animated, { FadeIn, Layout } from 'react-native-reanimated'
import { CenteredLoader, StyledText } from '../../components'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import { FONT, SPACING } from '../../constants/styles'
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
        <View style={styles.container}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Pressable onPress={onHideModal}>
              <StyledText>Close modal</StyledText>
            </Pressable>
            <Pressable onPress={saveEditedItem}>
              <StyledText>Save</StyledText>
            </Pressable>
          </View>
          <View>
            <TextInput
              value={text}
              onChangeText={setText}
              multiline={true}
              style={styles.input}
            />
          </View>
          {splitText.map((word, index) => {
            return (
              <Pressable onPress={() => deleteWord(index)} key={index}>
                <StyledText size="L">{word}</StyledText>
              </Pressable>
            )
          })}
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.L,
  },
  input: {
    fontSize: FONT.L,
    backgroundColor: 'white',
  },
})
