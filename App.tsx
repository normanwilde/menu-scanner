import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './navigators'
import { MenuContextProvider } from './contexts/menu'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import 'react-native-url-polyfill/auto'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    'Lato-Thin': require('./assets/fonts/Lato-Thin.ttf'),
    'Lato-ThinItalic': require('./assets/fonts/Lato-ThinItalic.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-LightItalic': require('./assets/fonts/Lato-LightItalic.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
    'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
    'Lato-BlackItalic': require('./assets/fonts/Lato-BlackItalic.ttf'),
  })

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync()
      }
    }
    hideSplashScreen()
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <MenuContextProvider>
      <StatusBar />
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation />
        </GestureHandlerRootView>
        <Toast />
      </NavigationContainer>
    </MenuContextProvider>
  )
}
