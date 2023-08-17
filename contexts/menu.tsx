import { createContext, useContext, useReducer } from 'react'

import { IMenuPage, IMenuItem, LanguageCode } from '../typings/data'
import { DUMMY_DATA } from '../constants/dummy-data'
import { getRandomId } from '../utils'

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
  targetLanguage: 'hu',
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
      type: 'DUPLICATE_ITEM'
      payload: {
        pageId: string
        itemId: string
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
      console.log(JSON.stringify(action.payload))
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
    case 'DUPLICATE_ITEM':
      const newPages = state.pages.map((menuPage) => {
        if (menuPage.id !== action.payload.pageId) {
          return menuPage
        }
        // if menu page is found
        const itemIndex = menuPage.menuItems
          .map((item) => item.id)
          .indexOf(action.payload.itemId)
        const duplicatedItem = {
          ...menuPage.menuItems[itemIndex],
          id: getRandomId(),
        }
        menuPage.menuItems.splice(itemIndex, 0, duplicatedItem)
        return menuPage
      })
      console.log(newPages)

      return {
        ...state,
        pages: newPages,
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
