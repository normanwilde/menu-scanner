import {
  textRecognizer,
  imageFinder,
  textTranslator,
  dishValidator,
  saveImageToDocumentDirectory,
  getRandomId,
  menuStorage,
} from '../utils'
import { IMenuItem, IMenuItems } from '../typings/data'
import { useMenu } from '../contexts'
import Toast from 'react-native-toast-message'
import { LANGUAGES } from '../constants/data'
import { notificationAsync, NotificationFeedbackType } from 'expo-haptics'

const useVision = () => {
  const { state, dispatch } = useMenu()

  const visualize = async (photoUrl: string, base64: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      /* DETECT TEXTS */
      const recognizedTexts = await textRecognizer(base64)
      if (!recognizedTexts) {
        throw new Error()
      }

      /* CHAT GPT */
      const foodNames = await dishValidator(
        recognizedTexts,
        LANGUAGES[state.targetLanguage]
      )

      if (!foodNames) {
        throw new Error()
      }

      /* FIND RELATED IMAGES */
      let menuItems: IMenuItems = {}
      for (let food of foodNames) {
        const images = await imageFinder(food.original)
        if (!images) {
          throw new Error()
        }
        const id = getRandomId()
        const menuItem: IMenuItem = {
          id,
          texts: {
            originalText: food.original,
            translatedText: food.translated,
            targetLanguage: state.targetLanguage,
          },
          images,
        }
        menuItems[id] = menuItem
      }

      const id = getRandomId()
      const photoFilePath = await saveImageToDocumentDirectory(
        photoUrl,
        `${id}.jpg`
      )

      const payload = {
        id,
        photoFilePath,
        menuItems,
        timestamp: Number(new Date()),
      }

      dispatch({
        type: 'ADD_PAGE',
        payload,
      })
      menuStorage.set(id, JSON.stringify(payload))
      notificationAsync(NotificationFeedbackType.Success)
      Toast.show({
        type: 'success',
        text1: 'Image successfully processed.',
      })
    } catch (e) {
      notificationAsync(NotificationFeedbackType.Error)
      Toast.show({
        type: 'error',
        text1: 'Error processing image. Please try again.',
      })
      console.error(e)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const refetch = async (itemName: string, pageId: string, itemId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      /* FIND RELATED IMAGES */
      const images = await imageFinder(itemName)
      if (!images) {
        throw new Error()
      }

      /* TRANSLATE TEXTS */
      const { targetLanguage } = state
      const translations = await textTranslator(itemName, targetLanguage)
      if (!translations) {
        throw new Error()
      }

      const editedItem = {
        id: itemId,
        texts: {
          originalText: itemName,
          translatedText: translations.translated,
          targetLanguage,
        },
        images,
      }

      dispatch({
        type: 'EDIT_ITEM',
        payload: {
          pageId,
          itemId,
          editedItem,
        },
      })
      menuStorage.set(pageId, JSON.stringify(state.pages[pageId])) // TODO: fix this fuck
      notificationAsync(NotificationFeedbackType.Success)
      Toast.show({
        type: 'success',
        text1: 'Menu item successfully updated.',
      })
      return 'ok'
    } catch (e) {
      notificationAsync(NotificationFeedbackType.Error)
      Toast.show({
        type: 'error',
        text1: 'Error updating menu item. Please try again.',
      })
      console.error(e)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  return { visualize, refetch }
}

export default useVision
