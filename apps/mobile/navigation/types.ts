/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DrawerScreenProps as DrawerStackScreenProps } from '@react-navigation/drawer'

// Root Stack Navigator

export type RootStackParamList = {
  Root: NavigatorScreenParams<DrawerParamList> | undefined
  Settings: NavigatorScreenParams<SettingsParamList> | undefined
  Teachers: undefined
  TeacherDetail: CourseDetailProps
  CourseDetail: NavigatorScreenParams<TabParamList>
  ItemDetail: ItemDetailProps
  SignIn: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

type CourseDetailProps = { teacherId: string }

type ItemDetailProps = {
  courseId: string
  id: string
  type: 'courseWork' | 'material'
}

// Root Drawer Navigator

export type DrawerParamList = {
  Home: undefined
  Courses: undefined
}

export type DrawerScreenProps<Screen extends keyof DrawerParamList> = CompositeScreenProps<
  DrawerStackScreenProps<DrawerParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

// CourseDetail Tab Navigator

export type TabParamList = {
  Stream: CourseDetailParams
  Work: CourseDetailParams
}

export type TabScreenProps<Screen extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

type CourseDetailParams = {
  courseId: string
}

// Settings Stack Navigator

export type SettingsParamList = {
  Index: undefined
  Profile: undefined
  About: undefined
}

export type SettingsScreenProps<Screen extends keyof SettingsParamList> = CompositeScreenProps<
  NativeStackScreenProps<SettingsParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>
