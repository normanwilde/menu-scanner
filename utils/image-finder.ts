import axios from 'axios'
import { IImageSearchResponseDTO } from '../typings/DTO'
import { IMenuImage } from '../typings/data'
import { getRandomId } from '.'

const imageFinder = async (searchTerm: string) => {
  const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/images`

  try {
    const imageResult = await axios.get<IImageSearchResponseDTO>(API_URL, {
      params: {
        q: searchTerm,
        searchType: 'image',
      },
    })
    if (!imageResult.data.items) {
      return []
    }
    const imageLinks: IMenuImage[] = imageResult.data.items.map((item) => ({
      id: getRandomId(),
      image: item.link,
      thumbnail: item.image.thumbnailLink,
    }))

    return imageLinks
  } catch (e) {
    console.error(e)
  }
}

export default imageFinder
