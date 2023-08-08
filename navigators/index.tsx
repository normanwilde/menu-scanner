import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../typings/navigators'
import CameraScreen from '../screens/camera'
import LanguageSelectorScreen from '../screens/language-selector'
import BottomTab from './bottom-tab'
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="BottomTab">
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
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
    </Stack.Navigator>
  )
}
