export interface IMenuText {
  originalText: string
  translatedText?: string
}

export interface IMenuItem {
  texts: IMenuText
  imageUrls?: string
}

export interface IMenuPage {
  photoUrl: string
  base64: string
  menuItems: IMenuItem[]
}
