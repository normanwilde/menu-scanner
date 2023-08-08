import axios from 'axios'
import { IImageSearchResponseDTO } from '../typings/DTO'

const imageFinder = async (searchTerm: string) => {
  const imageUrl = 'https://www.googleapis.com/customsearch/v1?'
  try {
    const imageResult = await axios.get<IImageSearchResponseDTO>(imageUrl, {
      params: {
        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        cx: process.env.EXPO_PUBLIC_SEARCH_ENGINE_ID,
        q: searchTerm,
        searchType: 'image',
      },
    })
    const imageLinks = imageResult.data.items.map((item) => item.link)
    return imageLinks
  } catch (e) {
    console.error(e)
  }
}

export default imageFinder
