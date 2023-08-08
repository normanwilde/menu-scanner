import { useState } from 'react'
import textRecognizer from '../utils/text-recognizer'
import imageFinder from '../utils/image-finder'
import { IMenuItem } from '../typings/data'
import { useMenu } from '../contexts/menu'
import textTranslator from '../utils/text-translator'

const useVision = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { dispatch } = useMenu()

  const visualize = async (photoUrl: string, base64: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: '' })

    try {
      /* DETECT TEXTS */
      const menuItemNames = await textRecognizer(base64)

      /* FIND RELATED IMAGES */
      if (menuItemNames) {
        let menuItems: IMenuItem[] = []
        for (let itemName of menuItemNames) {
          const imageUrl = await imageFinder(itemName)
          const menuItem: IMenuItem = {
            texts: {
              originalText: itemName,
              // TODO: add translation
            },
            imageUrl,
          }
          menuItems.push(menuItem)
        }

        /* TRANSLATE TEXTS */
        const targetLanguage = 'fr'
        const translations = await textTranslator(menuItemNames, targetLanguage)

        console.log(translations)

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
          payload: { photoUrl, menuItems: menuItemsWithTranslations },
        })
      }
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Error processing image' })
      console.error(e)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  return { visualize, loading, error }
}

export default useVision
