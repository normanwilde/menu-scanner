import { MMKV } from 'react-native-mmkv'

export const menuStorage = new MMKV({
  id: 'menu-storage',
})

export const sessionStorage = new MMKV({
  id: 'session-storage',
})
