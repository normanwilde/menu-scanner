// TODO: delete

import { BottomTabParamList } from '../typings/navigators'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MenuStack from './menu-stack'
import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'

const Tab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="MenuStack"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="MenuStack"
        component={MenuStack}
        options={{
          title: 'Menus',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'images' : 'images'}
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="DummyCamera"
        component={View}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="scan-sharp" color="black" size={36} />
          ),
          headerShown: false,
          title: 'Scan',
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate('Camera')
          },
        })}
      />
      <Tab.Screen
        name="DummyLanguageSelector"
        component={View}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'language' : 'language'}
              color={color}
              size={size}
            />
          ),
          // headerShown: false,
          title: 'Language',
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate('LanguageSelector')
          },
        })}
      />
    </Tab.Navigator>
  )
}
