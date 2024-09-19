import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './navigators'
import { MenuContextProvider } from './contexts/menu'
import Toast from 'react-native-toast-message'
import 'react-native-url-polyfill/auto'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { THEME } from './constants/styles'
import { MenuProvider } from 'react-native-popup-menu'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  return (
    <MenuContextProvider>
      <StatusBar />
      <NavigationContainer theme={THEME}>
        <MenuProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <Navigation />
            </SafeAreaProvider>
          </GestureHandlerRootView>
          <Toast />
          <StatusBar style="light" />
        </MenuProvider>
      </NavigationContainer>
    </MenuContextProvider>
  )
}
