export interface IMenuText {
  originalText: string
  translatedText?: string
}

export interface IMenuItem {
  texts: IMenuText
  imageUrl?: string
}

export interface IMenuPage {
  photoUrl: string
  menuItems: IMenuItem[]
}
