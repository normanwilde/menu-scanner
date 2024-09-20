import { getRandomId } from '../../utils'
import type { Action, IMenuPageContextState } from './types'

export const reducer = (
  state: IMenuPageContextState,
  action: Action
): IMenuPageContextState => {
  switch (action.type) {
    case 'ADD_PAGE': {
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.payload.id]: action.payload,
        },
      }
    }

    case 'DELETE_PAGE': {
      const { [action.payload.pageId]: _pageId, ...remainingPages } =
        state.pages
      return {
        ...state,
        pages: remainingPages,
      }
    }

    case 'DUPLICATE_ITEM': {
      const newId = getRandomId()

      return {
        ...state,
        pages: {
          ...state.pages,
          [action.payload.pageId]: {
            ...state.pages[action.payload.pageId],
            menuItems: {
              ...state.pages[action.payload.pageId].menuItems,
              [newId]: {
                ...state.pages[action.payload.pageId].menuItems[
                  action.payload.itemId
                ],
                id: newId,
              },
            },
          },
        },
      }
    }

    case 'EDIT_ITEM': {
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.payload.pageId]: {
            ...state.pages[action.payload.pageId],
            menuItems: {
              ...state.pages[action.payload.pageId].menuItems,
              [action.payload.itemId]: action.payload.editedItem,
            },
          },
        },
      }
    }

    case 'DELETE_ITEM': {
      const { [action.payload.itemId]: _itemToDelete, ...remainingItems } =
        state.pages[action.payload.pageId].menuItems

      return {
        ...state,
        pages: {
          ...state.pages,
          [action.payload.pageId]: {
            ...state.pages[action.payload.pageId],
            menuItems: remainingItems,
          },
        },
      }
    }

    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload,
      }
    }

    case 'SET_LANGUAGE': {
      return {
        ...state,
        targetLanguage: action.payload,
      }
    }
  }
}

export default reducer
