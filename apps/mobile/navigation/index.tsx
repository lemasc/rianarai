/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useColorMode, View } from 'native-base'

import { RootStackParamList } from './types'
import DrawerNavigator from './drawer'
import BottomTabNavigator from './bottomTab'

import { useAuth } from '@rianarai/ui-shared/context/auth'

import SignInScreen from '../screens/SignIn'
import TeachersScreen from '../screens/Teachers'
import TeacherDetailScreen from '../screens/Teachers/Detail'
import ItemDetailScreen from '../screens/Courses/Item/Detail'
import SettingsStackNavigator from './settings'
import { screenOptions } from './options'

export default function Navigation() {
  const { colorMode } = useColorMode()

  // Add a view fix white background flashing while navigating screens.
  return (
    <View flex="1" backgroundColor={colorMode === 'dark' ? 'black' : 'gray.50'}>
      <NavigationContainer theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </View>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  const { user, metadata } = useAuth()

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {user && metadata ? (
        <>
          <Stack.Screen name="Root" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen
            name="Teachers"
            component={TeachersScreen}
            options={{
              title: 'ครูผู้สอน',
            }}
          />
          <Stack.Screen
            name="CourseDetail"
            component={BottomTabNavigator}
            options={{
              title: 'รายละเอียดรายวิชา',
            }}
          />
          <Stack.Group screenOptions={{ presentation: 'card' }}>
            <Stack.Screen
              name="TeacherDetail"
              component={TeacherDetailScreen}
              options={{
                title: 'ข้อมูลครูผู้สอน',
              }}
            />
            <Stack.Screen
              name="ItemDetail"
              component={ItemDetailScreen}
              options={{
                title: 'รายละเอียด',
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsStackNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  )
}
