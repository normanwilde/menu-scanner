import { IMenuItem, IMenuPage } from './data'

export type RootStackParamList = {
  Camera: undefined
  MenuGallery: undefined
  MenuPage: {
    pageId: string
  }
  EditMenuPage: {
    pageId: string
    menuItem: IMenuItem
  }
  ImageGallery: {
    dish: IMenuItem
  }
  LanguageSelector: undefined
}
