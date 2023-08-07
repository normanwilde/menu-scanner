import { createContext, useContext, useReducer } from 'react'

import { IMenuPage, IMenuItem } from '../typings/data'

export interface IMenuPageContextState {
  pages: IMenuPage[]
}

const initialState = {
  pages: [],
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
  const [state, dispatch] = useReducer(reducer, { pages: [] })
  const value = { state, dispatch }

  return (
    <MenuPageContext.Provider value={value}>
      {children}
    </MenuPageContext.Provider>
  )
}

export const useMenu = () => useContext(MenuPageContext)

type Action =
  | { type: 'ADD_PAGE'; payload: { photoUrl: string; base64: string } }
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

const reducer = (
  state: IMenuPageContextState,
  action: Action
): IMenuPageContextState => {
  switch (action.type) {
    case 'ADD_PAGE':
      const pageToAdd: IMenuPage = {
        photoUrl: action.payload.photoUrl,
        base64: action.payload.base64,
        menuItems: [],
      }
      const pagesWithNewPage = [...state.pages, pageToAdd]
      return {
        ...state,
        pages: pagesWithNewPage,
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
  }
}

export default reducer
