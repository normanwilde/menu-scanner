import { Pressable, View, StyleSheet, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { useMenu } from '../../contexts/menu'
import { CenteredLoader, StyledText } from '../../components'
import { TextInput } from 'react-native-gesture-handler'
import { useLayoutEffect, useMemo, useState } from 'react'
import { COLOR, FONT, SPACING } from '../../constants/styles'
import useVision from '../../hooks/useVision'
import { StyledButton } from '../../components/styled-button'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { UndoIcon } from './undo-icon'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'

type Props = NativeStackScreenProps<RootStackParamList, 'EditMenuPage'>

export default function EditMenuPage({ route, navigation }: Props) {
  const { menuItem, pageId } = route.params
  const [text, setText] = useState(menuItem.texts.originalText)
  const { refetch } = useVision()
  const { state, dispatch } = useMenu()
  const { bottom } = useSafeAreaInsets()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <UndoIcon resetWord={resetWord} />,
    })
  }, [navigation])

  const splitText = useMemo(() => text.split(' '), [text])

  const buttonEnabled = useMemo(
    () => text.trim() !== menuItem.texts.originalText,
    [text, menuItem.texts.originalText]
  )

  const deleteWord = (itemIndex: number) => {
    const newText = text
      .split(' ')
      .filter((_value, index) => index !== itemIndex)
      .join(' ')
    setText(newText)
  }

  const resetWord = () => {
    setText(menuItem.texts.originalText)
  }

  const trimText = () => {
    setText(text.trim())
  }

  const updateItem = async () => {
    impactAsync(ImpactFeedbackStyle.Light)
    const trimmedText = text.trim()
    await refetch(trimmedText, pageId, menuItem.id)
    navigation.goBack()
  }

  const createNewItem = async () => {
    /*
    TODO
    Currently the original item is updated and a copy is created from the original. 
    The new item should be created second while keeping the original.
    */
    impactAsync(ImpactFeedbackStyle.Light)
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <UndoIcon resetWord={resetWord} />,
    })
  }, [navigation])

  if (state.loading) {
    return <CenteredLoader />
  }

  return (
    <View style={[styles.container, { paddingBottom: bottom + SPACING.L }]}>
      <ScrollView>
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
              onBlur={trimText}
              autoFocus
            />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <StyledText size="HEADING_XS" weight="bold">
            Delete words
          </StyledText>
          <View style={styles.bubbleContainer}>
            {splitText.map((word, index) => {
              const onPress = () => {
                impactAsync(ImpactFeedbackStyle.Light)
                deleteWord(index)
              }
              return (
                <Pressable
                  onPress={onPress}
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
          enabled={buttonEnabled}
        />
        <StyledButton
          title="Create New"
          style={styles.button}
          onPress={createNewItem}
          enabled={buttonEnabled}
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
    textAlignVertical: 'top',
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
    flexDirection: 'row',
    gap: SPACING.L,
  },
  button: {
    flex: 1,
  },
})
