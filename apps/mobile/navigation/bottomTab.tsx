import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { RootStackScreenProps, TabParamList } from './types'
import CourseStreamScreen from '../screens/Courses/Stream'
import CourseWorkScreen from '../screens/Courses/Work'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { theme } from '../constants/Theme'

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<TabParamList>()

export default function BottomTabNavigator({ route }: RootStackScreenProps<'CourseDetail'>) {
  const isLarge = useBreakpoint({ base: false, md: true })
  return (
    <BottomTab.Navigator
      initialRouteName="Stream"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Kanit-500',
          fontSize: isLarge ? 14 : 12,
          marginBottom: 4,
        },
        tabBarActiveTintColor: theme.colors.jaffa[500],
        tabBarIconStyle: {
          marginTop: isLarge ? undefined : 5,
        },
        tabBarStyle: {
          height: 55,
        },
      }}
    >
      <BottomTab.Screen
        name="Stream"
        component={CourseStreamScreen}
        initialParams={route.params.params}
        options={{
          title: 'สตรีม',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-multiple" size={25} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Work"
        component={CourseWorkScreen}
        initialParams={route.params.params}
        options={{
          title: 'งานของชั้นเรียน',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-list" size={25} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
