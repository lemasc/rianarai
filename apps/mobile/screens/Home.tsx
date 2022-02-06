import { HStack, VStack, ScrollView, Pressable, Box } from 'native-base'
import dayjs from 'dayjs'
import th from 'dayjs/locale/th'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import { DrawerScreenProps, DrawerParamList, RootStackParamList } from '../navigation/types'
import { useAuth } from '@rianarai/ui-shared/context/auth'
import { useTimeslot } from '@rianarai/ui-shared/context/timeslot'
import Container from '../components/layout/container'
import Timeslot from '../components/timeslot'
import Text from '../components/Text'
import React from 'react'
import { Native } from 'sentry-expo'

dayjs.extend(localizedFormat)
dayjs.extend(buddhistEra)
dayjs.locale(th)

export type Navigation = {
  rootScreen?: keyof RootStackParamList
  drawerScreen?: keyof DrawerParamList
  title: string
}

export default function HomeScreen({ navigation }: DrawerScreenProps<'Home'>) {
  const { metadata } = useAuth()
  const { date } = useTimeslot()
  const badge: Navigation[] = [
    {
      title: 'ครูผู้สอน',
      rootScreen: 'Teachers',
    },
    {
      title: 'รายวิชา',
      drawerScreen: 'Courses',
    },
    /*  {
      title: 'ตารางเรียน',
      rootScreen: 'Timetable' as never,
    },*/
  ]
  return (
    <Container>
      <VStack space={2}>
        <Text fontSize="3xl" fontWeight="semibold">
          สวัสดี {metadata?.displayName}
        </Text>
        <Text content fontSize="sm" color="gray.500">
          {dayjs(date).format('วันddddที่ D MMMM พ.ศ. BBBB เวลา HH:mm:ss น.')}
        </Text>
      </VStack>
      <Box>
        <ScrollView horizontal _contentContainerStyle={{ py: 4 }}>
          <HStack space={4} alignItems="center">
            <Text fontWeight="semibold" fontSize={'sm'}>
              จัดการข้อมูล
            </Text>
            <HStack space={2}>
              {badge.map((d) => (
                <Pressable
                  borderWidth="1"
                  bg="gray.100"
                  px="3"
                  py="1.5"
                  borderColor="gray.300"
                  rounded="full"
                  key={d.rootScreen ?? d.drawerScreen}
                  _pressed={{
                    bgColor: 'gray.200',
                  }}
                  _dark={{
                    bgColor: 'gray.800',
                    borderColor: 'gray.600',
                    _pressed: {
                      bgColor: 'gray.900',
                    },
                  }}
                  onPress={() => {
                    navigation.navigate(d.rootScreen ?? ('Root' as never), {
                      screen: d.drawerScreen,
                    } as never)
                  }}
                >
                  <Text fontFamily="Kanit-400" fontSize="xs">
                    {d.title}
                  </Text>
                </Pressable>
              ))}
            </HStack>
          </HStack>
        </ScrollView>
      </Box>
      <Box bg="gray.100" _dark={{ bgColor: 'gray.900' }} rounded="md" shadow="3">
        <Timeslot />
      </Box>
    </Container>
  )
}
