import { useState } from 'react'
import textRecognizer from '../utils/text-recognizer'
import imageFinder from '../utils/image-finder'
import { IMenuItem } from '../typings/data'
import { useMenu } from '../contexts/menu'

const useVision = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { dispatch } = useMenu()

  const visualize = async (photoUrl: string, base64: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: '' })

    try {
      const menuItemNames = await textRecognizer(base64)

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
        dispatch({
          type: 'ADD_PAGE',
          payload: { photoUrl, menuItems },
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
