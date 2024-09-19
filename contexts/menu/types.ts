import { IMenuItem, IMenuPage, LanguageCode } from '../../typings/data'

export interface IMenuPageContextState {
  pages: IMenuPage[]
  loading: boolean
  targetLanguage: LanguageCode
}

export type Action =
  | { type: 'ADD_PAGE'; payload: IMenuPage }
  | { type: 'CLEAR_PAGES' }
  | { type: 'DELETE_PAGE'; payload: { pageId: string } }
  | {
      type: 'DUPLICATE_ITEM'
      payload: {
        pageId: string
        itemId: string
      }
    }
  | {
      type: 'EDIT_ITEM'
      payload: {
        pageId: string
        itemId: string
        editedItem: IMenuItem
      }
    }
  | {
      type: 'DELETE_ITEM'
      payload: {
        pageId: string
        itemId: string
      }
    }
  | {
      type: 'CREATE_ITEM'
      payload: {
        pageId: string
        itemId: string
        editedItem: IMenuItem
      }
    }
  | {
      type: 'SET_LOADING'
      payload: boolean
    }
  | {
      type: 'SET_LANGUAGE'
      payload: LanguageCode
    }
