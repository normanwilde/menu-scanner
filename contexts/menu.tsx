import { createContext, useContext, useReducer } from 'react'

import { IMenuPage, IMenuItem, LanguageCode } from '../typings/data'
import { DUMMY_DATA } from '../constants/dummy-data'

export interface IMenuPageContextState {
  pages: IMenuPage[]
  loading: boolean
  targetLanguage: LanguageCode
}

const TEMP_INITIAL_STATE = [DUMMY_DATA]

const initialState: IMenuPageContextState = {
  // pages: [],
  pages: TEMP_INITIAL_STATE,
  loading: false,
  targetLanguage: 'en',
}

export const MenuPageContext = createContext<{
  state: IMenuPageContextState
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => [],
})

interface ValueProps {
  state: IMenuPageContextState
  dispatch: React.Dispatch<Action>
}

interface IProps {
  children: React.ReactNode
}

export const MenuContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <MenuPageContext.Provider value={value}>
      {children}
    </MenuPageContext.Provider>
  )
}

export const useMenu = () => useContext(MenuPageContext)

type Action =
  | { type: 'ADD_PAGE'; payload: IMenuPage }
  | {
      type: 'ADD_TEXTS'
      payload: { photoUrl: string; menuItems: IMenuItem[] }
    }
  | {
      type: 'SPLIT_ITEM'
      payload: {
        photoUrl: string
        menuItemIndex: number
        translatedTexts: IMenuItem[]
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

const reducer = (
  state: IMenuPageContextState,
  action: Action
): IMenuPageContextState => {
  switch (action.type) {
    case 'ADD_PAGE':
      return {
        ...state,
        pages: [action.payload, ...state.pages],
      }
    case 'ADD_TEXTS':
      const pagesWithUpdatedPage = state.pages.map((menuPage) => {
        if (menuPage.photoUrl === action.payload.photoUrl) {
          return { ...menuPage, menuItems: action.payload.menuItems }
        }
        return menuPage
      })
      return {
        ...state,
        pages: pagesWithUpdatedPage,
      }
    case 'SPLIT_ITEM':
      const pagesWithSplitItem = state.pages.map((menuPage) => {
        if (menuPage.photoUrl === action.payload.photoUrl) {
          menuPage.menuItems.splice(
            action.payload.menuItemIndex,
            1,
            ...action.payload.translatedTexts
          )
          return menuPage
        }
        return menuPage
      })
      return {
        ...state,
        pages: pagesWithSplitItem,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_LANGUAGE':
      return {
        ...state,
        targetLanguage: action.payload,
      }
  }
}

export default reducer
