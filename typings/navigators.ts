import { IMenuItem, IMenuPage } from './data'

export type RootStackParamList = {
  Camera: undefined
  MenuGallery: undefined
  MenuPage: {
    pageId: string
  }
  ImageGallery: {
    dish: IMenuItem
  }
  LanguageSelector: undefined
}
