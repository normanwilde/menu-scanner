import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../typings/navigators'
import CameraScreen from '../screens/camera'
import LanguageSelectorScreen from '../screens/language-selector'
import MenuGalleryScreen from '../screens/menu-gallery'
import MenuPageScreen from '../screens/menu-page'
import ImageGalleryScreen from '../screens/image-gallery'
import { HeaderIcon } from '../components'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="MenuGallery"
      screenOptions={{ headerRight: HeaderIcon }}
    >
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ presentation: 'fullScreenModal', headerShown: false }}
      />
      <Stack.Screen
        name="LanguageSelector"
        component={LanguageSelectorScreen}
        options={{ presentation: 'modal', headerTitle: 'Translate menu to' }}
      />
      <Stack.Screen
        name="MenuGallery"
        component={MenuGalleryScreen}
        options={{
          headerTitle: 'Dyner',
        }}
      />
      <Stack.Screen
        name="MenuPage"
        component={MenuPageScreen}
        options={{
          headerTitle: 'Menu',
        }}
      />
      <Stack.Screen
        name="ImageGallery"
        component={ImageGalleryScreen}
        options={({ route }) => ({
          headerTitle: route.params.dish.texts.originalText,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  )
}
