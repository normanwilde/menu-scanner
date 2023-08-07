import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './navigators'
import { MenuContextProvider } from './contexts/menu'

export default function App() {
  return (
    <MenuContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </MenuContextProvider>
  )
}
