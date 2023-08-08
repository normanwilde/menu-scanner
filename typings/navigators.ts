import { NavigatorScreenParams } from '@react-navigation/native'
import { IMenuItem, IMenuPage } from './data'

export type RootStackParamList = {
  Camera: undefined
  LanguageSelector: undefined
  BottomTab: NavigatorScreenParams<BottomTabParamList>
}

export type MenuStackParamList = {
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

export type BottomTabParamList = {
  MenuStack: NavigatorScreenParams<MenuStackParamList>
  DummyCamera: undefined
  DummyLanguageSelector: undefined
}
