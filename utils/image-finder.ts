import axios from 'axios'
import { IImageSearchResponseDTO } from '../typings/DTO'
import { IMenuImage } from '../typings/data'

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
    if (!imageResult.data.items) {
      return []
    }
    const imageLinks: IMenuImage[] = imageResult.data.items.map((item) => ({
      image: item.link,
      thumbnail: item.image.thumbnailLink,
    }))
    console.log({ imageLinks })
    return imageLinks
  } catch (e) {
    console.error(e)
  }
}

export default imageFinder
