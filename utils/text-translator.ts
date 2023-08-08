import axios from 'axios'
import { ITextTranslationDTO } from '../typings/DTO'
import { LanguageCode } from '../typings/data'

const API_URL = `https://translation.googleapis.com/language/translate/v2?key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`

const textTranslator = async (
  menuItemNames: string[],
  targetLanguage: LanguageCode
) => {
  const body = {
    q: menuItemNames,
    target: targetLanguage,
  }

  try {
    const response = await axios.post<ITextTranslationDTO>(API_URL, body)
    const result = response.data.data.translations
    return result
  } catch (e) {
    console.error(e)
  }
}

export default textTranslator
