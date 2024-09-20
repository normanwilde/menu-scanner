import axios from 'axios'
import { IAIItemDTO } from '../typings/DTO'
import { LanguageCode } from '../typings/data'

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/translations`

export const textTranslator = async (text: string, language: LanguageCode) => {
  const body = {
    language,
    text,
  }

  try {
    const response = await axios.post<IAIItemDTO>(API_URL, body)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
