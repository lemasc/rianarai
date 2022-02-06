import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SettingsParamList } from './types'

import { screenOptions } from './options'
import AboutScreen from '../screens/Settings/About'
import SettingsScreen from '../screens/Settings'
import ProfileSettingsScreen from '../screens/Settings/Profile'

const Stack = createNativeStackNavigator<SettingsParamList>()

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ ...screenOptions }} initialRouteName="Index">
      <Stack.Screen name="Index" component={SettingsScreen} options={{ title: 'การตั้งค่า' }} />
      <Stack.Screen
        name="Profile"
        component={ProfileSettingsScreen}
        options={{ title: 'ข้อมูลส่วนตัว' }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'เกี่ยวกับ RianArai' }}
      />
    </Stack.Navigator>
  )
}
