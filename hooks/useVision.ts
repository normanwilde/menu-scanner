import textRecognizer from '../utils/text-recognizer'
import imageFinder from '../utils/image-finder'
import { IMenuItem } from '../typings/data'
import { useMenu } from '../contexts/menu'
import textTranslator from '../utils/text-translator'
import Toast from 'react-native-toast-message'
import dishValidator from '../utils/dish-validator'

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

      /* VALIDATE TEXT ITEMS */
      const booleanArray = await dishValidator(recognizedTexts)

      const menuItemNames = recognizedTexts.filter((_item, index) => {
        return booleanArray[index]
      })

      /* SANITIZE TEXTS */
      // const menuItemNames = validatedTexts.filter((itemName) => {
      //   return !/\d/.test(itemName)
      // })

      /* FIND RELATED IMAGES */
      let menuItems: IMenuItem[] = []
      for (let itemName of menuItemNames) {
        const images = await imageFinder(itemName)
        if (!images) {
          throw new Error()
        }
        const menuItem: IMenuItem = {
          texts: {
            originalText: itemName,
          },
          images,
        }
        menuItems.push(menuItem)
      }

      /* TRANSLATE TEXTS */
      const targetLanguage = state.targetLanguage
      const translations = await textTranslator(menuItemNames, targetLanguage)
      if (!translations) {
        throw new Error()
      }
      const menuItemsWithTranslations: IMenuItem[] = menuItems.map(
        (menuItem, index) => {
          return {
            ...menuItem,
            texts: {
              ...menuItem.texts,
              translatedText: translations[index].translatedText,
              sourceLanguage: translations[index].detectedSourceLanguage,
              targetLanguage,
            },
          }
        }
      )

      dispatch({
        type: 'ADD_PAGE',
        payload: {
          photoUrl,
          menuItems: menuItemsWithTranslations,
          timestamp: Number(new Date()),
        },
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

  return { visualize }
}

export default useVision
