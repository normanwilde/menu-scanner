import textRecognizer from '../utils/text-recognizer'
import imageFinder from '../utils/image-finder'
import { IMenuItem } from '../typings/data'
import { useMenu } from '../contexts/menu'
import textTranslator from '../utils/text-translator'
import Toast from 'react-native-toast-message'
import dishValidator from '../utils/dish-validator'
import { getRandomId } from '../utils'
import { LANGUAGES } from '../constants/data'

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
      let menuItems: IMenuItem[] = []
      for (let food of foodNames) {
        const images = await imageFinder(food.original)
        if (!images) {
          throw new Error()
        }
        const menuItem: IMenuItem = {
          id: getRandomId(),
          texts: {
            originalText: food.original,
            translatedText: food.translated,
            targetLanguage: state.targetLanguage,
          },
          images,
        }
        menuItems.push(menuItem)
      }

      dispatch({
        type: 'ADD_PAGE',
        payload: {
          id: getRandomId(),
          photoUrl,
          menuItems,
          timestamp: Number(new Date()),
        },
      })
      Toast.show({
        type: 'success',
        text1: 'Image successfully processed.',
      })
    } catch (e) {
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
      const targetLanguage = state.targetLanguage
      const translations = await textTranslator([itemName], targetLanguage)
      if (!translations) {
        throw new Error()
      }

      const editedItem = {
        id: itemId,
        texts: {
          originalText: itemName,
          translatedText: translations[0].translatedText,
          sourceLanguage: translations[0].detectedSourceLanguage,
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
      Toast.show({
        type: 'success',
        text1: 'Menu item successfully updated.',
      })
      return 'ok'
    } catch (e) {
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
