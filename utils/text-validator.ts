import axios from 'axios'
import { ITextTranslationDTO } from '../typings/DTO'
import { LANGUAGES } from '../constants/data'

const API_URL = `https://translation.googleapis.com/language/translate/v2?key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`

const textTranslator = (rawTexts: string[]) => {
  return rawTexts.filter((item) => {
    return /^[^.\d]*$/.test(item)
  })
}

export default textTranslator
