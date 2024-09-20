import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

import { IMenuPage, IMenuPages, LanguageCode } from '../../typings/data'
import { getLocales } from 'expo-localization'
import { LANGUAGES } from '../../constants/data'
import { Action, IMenuPageContextState } from './types'
import reducer from './reducer'
import { menuStorage } from '../../utils'

const storedPages = menuStorage
  .getAllKeys()
  .reduce((pages: IMenuPages, key: string) => {
    try {
      const page = menuStorage.getString(key)
      if (!page) {
        return pages
      }
      const parsedPage = JSON.parse(page) as IMenuPage
      return { ...pages, [parsedPage.id]: JSON.parse(page) }
    } catch {
      return pages
    }
  }, {}) as IMenuPages

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
  const value = useMemo(() => ({ state, dispatch }), [state])

  // useEffect(() => {
  //   menuStorage.clearAll()
  //   state.pages.forEach((page) => {
  //     menuStorage.set(page.id, JSON.stringify(page))
  //   })
  // }, [state.pages])

  return (
    <MenuPageContext.Provider value={value}>
      {children}
    </MenuPageContext.Provider>
  )
}

export const useMenu = () => useContext(MenuPageContext)
