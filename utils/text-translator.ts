import axios from 'axios'
import { ITextTranslationDTO } from '../typings/DTO'
import { LanguageCode } from '../typings/data'

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/translations`

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
