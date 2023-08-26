import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../typings/navigators'
import CameraScreen from '../screens/camera'
import LanguageSelectorScreen from '../screens/language-selector'
import MenuGalleryScreen from '../screens/menu-gallery'
import MenuPageScreen from '../screens/menu-page'
import ImageGalleryScreen from '../screens/image-gallery'
import { HeaderIcon } from '../components'
import { COLOR } from '../constants/styles'
import EditMenuPageScreen from '../screens/edit-menu-page'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="MenuGallery"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLOR.backgroundPrimary,
        },
        headerTitleStyle: {
          color: COLOR.textPrimary,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ presentation: 'fullScreenModal', headerShown: false }}
      />
      <Stack.Screen
        name="LanguageSelector"
        component={LanguageSelectorScreen}
        options={{
          headerTitle: 'Target language',
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placeholder: 'hello',
          },
        }}
      />
      <Stack.Screen
        name="MenuGallery"
        component={MenuGalleryScreen}
        options={{
          headerTitle: 'Dyner',
          headerRight: HeaderIcon,
        }}
      />
      <Stack.Screen
        name="MenuPage"
        component={MenuPageScreen}
        options={{
          headerTitle: 'Dishes',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="EditMenuPage"
        component={EditMenuPageScreen}
        options={{
          headerTitle: 'Edit Dish Name',
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
