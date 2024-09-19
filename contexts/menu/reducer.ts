import { getRandomId } from '../../utils'
import type { Action, IMenuPageContextState } from './types'

export const reducer = (
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
