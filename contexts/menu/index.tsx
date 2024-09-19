import { createContext, useContext, useEffect, useReducer } from 'react'

import { IMenuPage, LanguageCode } from '../../typings/data'
import { getLocales } from 'expo-localization'
import { LANGUAGES } from '../../constants/data'
import { MMKV } from 'react-native-mmkv'
import { Action, IMenuPageContextState } from './types'
import reducer from './reducer'

export const storage = new MMKV()

const storedPages = storage
  .getAllKeys()
  .reduce((pages: IMenuPage[], key: string) => {
    try {
      const page = storage.getString(key)
      if (!page) {
        return pages
      }
      return [...pages, JSON.parse(page)]
    } catch {
      return pages
    }
  }, []) as IMenuPage[]

const deviceLanguage = getLocales()?.[0].languageCode as LanguageCode

const initialState: IMenuPageContextState = {
  pages: storedPages,
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

  useEffect(() => {
    storage.clearAll()
    state.pages.forEach((page) => {
      storage.set(page.id, JSON.stringify(page))
    })
  }, [state.pages])

  return (
    <MenuPageContext.Provider value={value}>
      {children}
    </MenuPageContext.Provider>
  )
}

export const useMenu = () => useContext(MenuPageContext)
