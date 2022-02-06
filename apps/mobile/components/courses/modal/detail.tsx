import { useLayoutEffect } from 'react'
import { Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Stack, VStack, ScrollView, Box, Button, HStack } from 'native-base'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import { RootStackScreenProps } from '../../../navigation/types'
import { isCourseWork, StaticAttachment, Submission } from '@rianarai/classroom'
import { createDueDate, createState, getColor, getStateName } from '@rianarai/shared/work'

import Attachments from '../attachments'
import { showUpdateTime } from '../feedItem'
import Markdown from '../../Markdown'
import Skeleton from '../../Skeleton'
import Text from '../../Text'

dayjs.extend(buddhistEra)

type DetailResource = {
  title?: string | null
  creationTime?: string | null
  updateTime?: string | null
  alternateLink?: string | null
  description?: string | null
  materials?: StaticAttachment[] | null
  maxPoints?: number | null
}

export default function DetailModal({
  data,
  type,
  submission,
}: {
  data?: DetailResource
  type: string
  submission?: Submission
}) {
  const courseWorkContent = data && (data.description || data.materials)
  const submissionContent = submission && submission.assignmentSubmission
  const navigation = useNavigation<RootStackScreenProps<'ItemDetail'>['navigation']>()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'รายละเอียด' + type,
    })
  }, [navigation, type])

  return (
    <VStack h="full" bgColor="white" _dark={{ bgColor: 'gray.900' }}>
      <Stack
        p="6"
        flexShrink={0}
        space={2}
        direction={{
          base: 'column',
          md: 'row',
        }}
        bgColor="gray.50"
        borderBottomWidth={1}
        borderColor={'gray.300'}
        _dark={{
          bgColor: 'black',
          borderColor: 'gray.600',
        }}
      >
        <VStack space={2} alignItems={'flex-start'} w="full">
          <Skeleton height={40} width={300}>
            {data ? (
              <Text fontSize="xl" content bold mr="4">
                {data?.title}
              </Text>
            ) : undefined}
          </Skeleton>
          <Skeleton height={data && isCourseWork(data) ? 75 : 50} width={250}>
            {data ? (
              <Text color="gray.500" lineHeight={26} content>
                ประเภท: {type}
                {'\n'}สร้างเมื่อ {dayjs(data.creationTime).format('DD MMM BBBB เวลา HH:mm น.')}
                {showUpdateTime(data.creationTime, data.updateTime) && (
                  <>
                    {'\n'}
                    {dayjs(data.updateTime).format('แก้ไขเมื่อ DD MMM BBBB เวลา HH:mm น.')}
                  </>
                )}
                {isCourseWork(data) && (
                  <>
                    {'\n'}
                    {data.dueDate
                      ? createDueDate(data)?.format('ครบกำหนดวันที่ DD MMM BBBB เวลา HH:mm น.')
                      : 'ไม่มีวันครบกำหนด'}
                  </>
                )}
              </Text>
            ) : undefined}
          </Skeleton>
        </VStack>
      </Stack>

      {courseWorkContent || submissionContent ? (
        <ScrollView
          _contentContainerStyle={{
            display: 'flex',
            flexDirection: 'column',
            p: 6,
          }}
        >
          {courseWorkContent && (
            <VStack pb="4" space={data.description ? '2' : '3'}>
              <Text content bold underline pb="1">
                รายละเอียด{type}
              </Text>
              {data.description && (
                <Markdown pb={data.materials ? '4' : undefined}>{data.description}</Markdown>
              )}
              {data?.materials && <Attachments modal attachments={data.materials} />}
            </VStack>
          )}
          {submissionContent && submission.assignmentSubmission?.attachments && (
            <VStack space={'3'}>
              <Text content bold underline pt="2" pb="1">
                งานที่แนบไว้
              </Text>
              <Attachments modal attachments={submission.assignmentSubmission.attachments} />
            </VStack>
          )}
        </ScrollView>
      ) : (
        <Box px="6" py="4" flexGrow={1} />
      )}
      <VStack
        p="6"
        space={4}
        borderTopWidth={1}
        borderColor="gray.300"
        _dark={{ borderColor: 'gray.600' }}
      >
        {data && isCourseWork(data) && (
          <HStack space={4} alignItems={'center'}>
            <Text
              content
              bold
              fontSize="lg"
              flexGrow={1}
              color={getColor(createState(submission?.state, data))}
            >
              {getStateName(createState(submission?.state, data))}
            </Text>
            {data?.maxPoints &&
              (submission?.assignedGrade ? (
                <Text fontSize="lg" content bold>
                  {submission.assignedGrade}/{data?.maxPoints}
                </Text>
              ) : (
                <Text color={'gray.500'} content bold>
                  {data?.maxPoints} คะแนน
                </Text>
              ))}
          </HStack>
        )}
        <Button
          py="3"
          bgColor={'green.500'}
          _pressed={{
            bgColor: 'green.600',
          }}
          onPress={() => Linking.openURL(data?.alternateLink as string)}
        >
          <Text fontWeight={'semibold'} color="white">
            เปิดใน Google Classroom
          </Text>
        </Button>
      </VStack>
    </VStack>
  )
}
