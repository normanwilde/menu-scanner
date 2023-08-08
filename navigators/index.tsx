/* Libraries */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* Types */
import { RootStackParamList } from '../typings/navigators'

/* Screens */
import CameraScreen from '../screens/camera'
import MenuGalleryScreen from '../screens/menu-gallery'
import MenuPageScreen from '../screens/menu-page'

/* Components */
import { HeaderIcon } from '../components'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="MenuGallery">
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name="MenuGallery"
        component={MenuGalleryScreen}
        options={{
          headerRight: HeaderIcon,
          headerTitle: 'Dyner',
        }}
      />
      <Stack.Screen
        name="MenuPage"
        component={MenuPageScreen}
        options={{
          headerRight: HeaderIcon,
          headerTitle: 'Dyner',
        }}
      />
    </Stack.Navigator>
  )
}
