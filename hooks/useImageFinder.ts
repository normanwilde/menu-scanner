import axios from 'axios'
import { IImageSearchResponseDTO } from '../typings/DTO'
import { useState } from 'react'

const imageUrl = 'https://www.googleapis.com/customsearch/v1?'

const useImageFinder = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const findImages = async (searchTerm: string) => {
    setError('')
    setLoading(true)
    try {
      const imageResult = await axios.get<IImageSearchResponseDTO>(imageUrl, {
        params: {
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          cx: process.env.EXPO_PUBLIC_SEARCH_ENGINE_ID,
          q: searchTerm,
          searchType: 'image',
        },
      })
      const imageLink = imageResult.data.items[0].link
      return imageLink
    } catch (e) {
      console.error(e)
      setError('Error finding related images')
    } finally {
      setLoading(false)
    }
  }

  return { findImages, loading, error }
}

export default useImageFinder
