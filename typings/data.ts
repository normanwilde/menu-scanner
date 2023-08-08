import { LANGUAGES } from '../constants/data'

export interface IMenuText {
  originalText: string
  translatedText?: string
  sourceLanguage?: keyof typeof LANGUAGES
  targetLanguage?: keyof typeof LANGUAGES
}

export interface IMenuItem {
  texts: IMenuText
  images: string[]
}

export interface IMenuPage {
  photoUrl: string
  menuItems: IMenuItem[]
}
