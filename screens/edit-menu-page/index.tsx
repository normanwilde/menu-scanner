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
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { useMenu } from '../../contexts/menu'
import Animated, { FadeIn, Layout } from 'react-native-reanimated'
import { CenteredLoader, StyledText } from '../../components'
import { TextInput } from 'react-native-gesture-handler'
import { useEffect, useRef, useState } from 'react'
import { COLOR, FONT, SPACING } from '../../constants/styles'
import useVision from '../../hooks/useVision'
import { StyledButton } from '../../components/styled-button'

type Props = NativeStackScreenProps<RootStackParamList, 'EditMenuPage'>

export default function EditMenuPage({ route, navigation }: Props) {
  const { menuItem, pageId } = route.params
  const [text, setText] = useState(menuItem.texts.originalText)
  const { refetch } = useVision()
  const { state, dispatch } = useMenu()

  const inputRef = useRef<TextInput>(null)

  const splitText = text.split(' ')

  const deleteWord = (itemIndex: number) => {
    const newText = text
      .split(' ')
      .filter((_value, index) => index !== itemIndex)
      .join(' ')
    setText(newText)
  }

  const trimText = () => {
    setText(text.trim())
  }

  const updateItem = async () => {
    const trimmedText = text.trim()
    await refetch(trimmedText, pageId, menuItem.id)
    navigation.goBack()
  }

  const createNewItem = async () => {
    const trimmedText = text.trim()
    dispatch({
      type: 'DUPLICATE_ITEM',
      payload: {
        pageId,
        itemId: menuItem.id,
      },
    })
    await refetch(trimmedText, pageId, menuItem.id)
    navigation.goBack()
  }

  if (state.loading) {
    return <CenteredLoader />
  }

  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <StyledText size="HEADING_S" weight="black">
          {text}
        </StyledText>
        <View style={styles.sectionContainer}>
          <StyledText size="HEADING_XS" weight="bold">
            Edit dish name
          </StyledText>
          <View>
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
      <View style={styles.buttonWrapper}>
        <StyledButton
          type="outlined"
          title="Update"
          style={styles.button}
          onPress={updateItem}
        />
        <StyledButton
          title="Create New"
          style={styles.button}
          onPress={createNewItem}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.L,
  },
  content: {
    flex: 1,
  },
  sectionContainer: {
    paddingBottom: SPACING.M,
  },
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
    paddingVertical: SPACING.S,
    paddingHorizontal: SPACING.M,
    backgroundColor: COLOR.accentQuaternary,
    borderRadius: SPACING.M,
  },
  buttonWrapper: {
    paddingBottom: SPACING.XXL,
    flexDirection: 'row',
    gap: SPACING.L,
  },
  button: {
    flex: 1,
  },
})
