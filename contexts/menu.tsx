import { createContext, useContext, useReducer } from 'react'

import { IMenuPage, IMenuItem, LanguageCode } from '../typings/data'
import { DUMMY_DATA } from '../constants/dummy-data'
import { getRandomId } from '../utils'
import { getLocales } from 'expo-localization'
import { LANGUAGES } from '../constants/data'
export interface IMenuPageContextState {
  pages: IMenuPage[]
  loading: boolean
  targetLanguage: LanguageCode
}

const deviceLanguage = getLocales()?.[0].languageCode as LanguageCode

const TEMP_INITIAL_STATE = [DUMMY_DATA]

const initialState: IMenuPageContextState = {
  // pages: [],
  pages: TEMP_INITIAL_STATE,
  loading: false,
  targetLanguage: LANGUAGES[deviceLanguage] ? deviceLanguage : 'en',
}

export const MenuPageContext = createContext<{
  state: IMenuPageContextState
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => [],
})

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
    case 'CLEAR_PAGES':
      return {
        ...state,
        pages: [],
      }
    case 'DELETE_PAGE':
      const newPagesWithDeletedPage = state.pages.filter(
        (page) => page.id !== action.payload.pageId
      )
      return {
        ...state,
        pages: newPagesWithDeletedPage,
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
        menuPage.menuItems.splice(itemIndex + 1, 0, duplicatedItem)
        return menuPage
      })

      return {
        ...state,
        pages: newPages,
      }
    case 'EDIT_ITEM':
      const newPagesWithEdited = state.pages.map((menuPage) => {
        if (menuPage.id !== action.payload.pageId) {
          return menuPage
        }
        // if menu page is found
        const newItems = menuPage.menuItems.map((menuItem) => {
          if (menuItem.id !== action.payload.itemId) {
            return menuItem
          }
          return action.payload.editedItem
        })
        return {
          ...menuPage,
          menuItems: newItems,
        }
      })

      return {
        ...state,
        pages: newPagesWithEdited,
      }
    case 'DELETE_ITEM':
      const newPagesWithDeleted = state.pages.map((menuPage) => {
        if (menuPage.id !== action.payload.pageId) {
          return menuPage
        }
        // if menu page is found
        const remainingItems = menuPage.menuItems.filter((menuItem) => {
          return menuItem.id !== action.payload.itemId
        })
        return {
          ...menuPage,
          menuItems: remainingItems,
        }
      })

      return {
        ...state,
        pages: newPagesWithDeleted,
      }
    case 'CREATE_ITEM':
      const newPagesWithCreated = state.pages.map((menuPage) => {
        if (menuPage.id !== action.payload.pageId) {
          return menuPage
        }
        // if menu page is found
        const itemIndex = menuPage.menuItems
          .map((item) => item.id)
          .indexOf(action.payload.itemId)
        menuPage.menuItems.splice(itemIndex + 1, 0, action.payload.editedItem)
        return menuPage
      })

      return {
        ...state,
        pages: newPagesWithCreated,
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
