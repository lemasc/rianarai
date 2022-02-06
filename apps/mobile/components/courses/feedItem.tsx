import { ReactNode } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  HStack,
  Pressable,
  VStack,
  Box,
  Icon,
  IPressableProps,
  IButtonProps,
  Avatar,
} from 'native-base'
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import dayjs, { Dayjs } from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import th from 'dayjs/locale/th'

import { WorkState } from '@rianarai/classroom'
import { isWorkSubmitted } from '@rianarai/shared/work'

import Text from '../Text'

dayjs.locale(th)
dayjs.extend(localizedFormat)
dayjs.extend(buddhistEra)

export function showUpdateTime(creationTime?: string | null, updateTime?: string | null) {
  // We allow the gap time between creationTime and updateTime for 30 seconds.
  return creationTime && updateTime && dayjs(updateTime).subtract(1, 'm').isAfter(creationTime)
}

export function FeedItemHeader({
  state,
  dueDate,
  work,
  type,
  title,
  creationTime,
  updateTime,
  photoUrl,
}: {
  type: 'announcement' | 'courseWork' | 'material'
  creationTime?: string
  updateTime?: string
  title?: string
  photoUrl?: string
  work?: boolean
  dueDate?: Dayjs
  state?: WorkState
}) {
  const dateFormat = 'D MMM BB HH:mm น.'
  let icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  let text: string
  switch (type) {
    case 'announcement':
      icon = 'bullhorn-outline'
      text = 'ประกาศ'
      break
    case 'courseWork':
      icon = 'clipboard-list-outline'
      text = 'งาน'
      break
    case 'material':
      icon = 'book-outline'
      text = 'เนื้อหา'
      break
  }

  return (
    <HStack space={4} alignItems={'center'}>
      {photoUrl ? (
        <>
          <Avatar source={{ uri: photoUrl }} />
        </>
      ) : (
        <Box
          rounded="full"
          bgColor={state && isWorkSubmitted(state) ? 'gray.400' : 'jaffa.500'}
          p="3"
        >
          <Icon as={MaterialCommunityIcons} name={icon} color="white" size="5" />
        </Box>
      )}
      <VStack space={1} alignItems={'flex-start'} flexShrink={1}>
        <Text textAlign={'left'} content bold isTruncated noOfLines={2}>
          {!work && text}
          {title && (!work ? ': ' : '') + title}
        </Text>

        <Text content color="gray.500" flex={1} fontSize={'xs'} isTruncated noOfLines={2}>
          {work ? (
            type !== 'courseWork' ? (
              <>
                {showUpdateTime(creationTime, updateTime) ? 'แก้ไขเมื่อ' : 'สร้างเมื่อ'}{' '}
                {dayjs(showUpdateTime(creationTime, updateTime) ? updateTime : creationTime).format(
                  dateFormat
                )}
              </>
            ) : (
              <>
                {dueDate ? dueDate.format(`ครบกำหนดวันที่ ${dateFormat}`) : 'ไม่มีวันที่ครบกำหนด'}
              </>
            )
          ) : (
            <>
              {dayjs(creationTime).format(`สร้างเมื่อ ${dateFormat}`)}
              {showUpdateTime(creationTime, updateTime) &&
                dayjs(updateTime).format(` (แก้ไขเมื่อ ${dateFormat})`)}
            </>
          )}
        </Text>
      </VStack>
    </HStack>
  )
}

type CompatibleProps = IVStackProps | IButtonProps
export function FeedItem({
  children,
  onPress,
  ...rest
}: {
  onPress?: () => void
  children: ReactNode | ReactNode[]
} & CompatibleProps) {
  if (onPress)
    return (
      <Pressable
        onPress={onPress}
        _pressed={{ bgColor: 'gray.200' }}
        p="4"
        {...(rest as IPressableProps)}
      >
        {children}
      </Pressable>
    )
  return (
    <VStack space={2} p="4" {...(rest as IVStackProps)}>
      {children}
    </VStack>
  )
}
