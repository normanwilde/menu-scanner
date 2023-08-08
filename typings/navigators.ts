import { IMenuItem, IMenuPage } from './data'

export type RootStackParamList = {
  Camera: undefined
  MenuGallery: undefined
  MenuPage: {
    page: IMenuPage
  }
  ImageGallery: {
    dish: IMenuItem
  }
  LanguageSelector: undefined
}
