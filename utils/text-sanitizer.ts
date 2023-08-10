import axios from 'axios'
import { ITextTranslationDTO } from '../typings/DTO'
import { LANGUAGES } from '../constants/data'

const API_URL = `https://translation.googleapis.com/language/translate/v2?key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`

const textSanitizer = (rawTexts: string[]) => {
  const sanitizedTexts = rawTexts
    .filter((item) => {
      return (
        !item.includes('$') &&
        !item.includes('€') &&
        !item.includes('£') &&
        !item.includes('<') &&
        !item.includes('>') &&
        !item.includes('!') &&
        !item.includes('?') &&
        !item.includes('%') &&
        !item.includes('=') &&
        item.length < 50 &&
        2 < item.length
      )
    })
    .map((item) => {
      return item
        .replace('.', ' ')
        .replace('*', ' ')
        .replace('(', '')
        .replace(')', '')
        .replace(',', ' ')
        .trim()
    })
  return sanitizedTexts
}

export default textSanitizer
