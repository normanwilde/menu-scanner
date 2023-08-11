// TODO: delete

/* Libraries */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* Types */
import { MenuStackParamList, RootStackParamList } from '../typings/navigators'

/* Screens */
import CameraScreen from '../screens/camera'
import MenuGalleryScreen from '../screens/menu-gallery'
import MenuPageScreen from '../screens/menu-page'
import ImageGalleryScreen from '../screens/image-gallery'
import LanguageSelectorScreen from '../screens/language-selector'

const Stack = createNativeStackNavigator<MenuStackParamList>()

export default function MenuStack() {
  return (
    <Stack.Navigator initialRouteName="MenuGallery">
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
