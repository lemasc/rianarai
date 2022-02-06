import { StyleProp, TextStyle } from 'react-native'

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationOptions,
} from '@react-navigation/drawer'

import { Divider } from 'native-base'

import { DrawerParamList } from './types'
import useColorModeValue from '../hooks/useColorModeValue'
import Brand from '../components/layout/brand'

import { screenOptions } from './options'
import HomeScreen from '../screens/Home'
import CoursesPage from '../screens/Courses'

const drawerLabelStyle: StyleProp<TextStyle> = {
  fontFamily: 'Kanit-400',
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <Brand p="5" />
      <DrawerItemList {...props} />
      <Divider my="4" />
      <DrawerItem
        label="การตั้งค่า"
        labelStyle={drawerLabelStyle}
        onPress={() => {
          props.navigation.navigate('Settings')
          props.navigation.closeDrawer()
        }}
      />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator<DrawerParamList>()

export default function DrawerNavigator() {
  const theme = useColorModeValue<DrawerNavigationOptions>(
    {
      drawerActiveBackgroundColor: '#ffe199',
      drawerActiveTintColor: '#262626',
      headerTintColor: '#000',
    },
    {
      drawerActiveBackgroundColor: '#D48D02',
      drawerActiveTintColor: '#f5f5f5',
      headerTintColor: '#fff',
    }
  )
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        ...screenOptions,
        drawerLabelStyle,
        ...theme,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'หน้าหลัก',
        }}
      />
      <Drawer.Screen
        name="Courses"
        component={CoursesPage}
        options={{
          title: 'รายวิชา',
        }}
      />
    </Drawer.Navigator>
  )
}
