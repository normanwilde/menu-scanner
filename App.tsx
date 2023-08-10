import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './navigators'
import { MenuContextProvider } from './contexts/menu'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import 'react-native-url-polyfill/auto'

// SplashScreen.preventAutoHideAsync()

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  // })

  // useEffect(() => {
  //   const hideSplashScreen = async () => {
  //     if (fontsLoaded) {
  //       await SplashScreen.hideAsync()
  //     }
  //   }
  //   hideSplashScreen()
  // }, [fontsLoaded])

  // if (!fontsLoaded) {
  //   return null
  // }
  return (
    <MenuContextProvider>
      <StatusBar />
      <NavigationContainer>
        <Navigation />
        <Toast />
      </NavigationContainer>
    </MenuContextProvider>
  )
}
