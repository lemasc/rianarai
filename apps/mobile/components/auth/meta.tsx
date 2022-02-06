import { useEffect } from 'react'
import { Box, Button, HStack, VStack } from 'native-base'
import { useForm } from 'react-hook-form'

import { UserMetadata } from '@rianarai/classroom/types/auth'
import { useAuth } from '@rianarai/ui-shared/context/auth'
import { alertAsync } from '@rianarai/ui-shared/alert'

import { SelectInput, SelectItems, TextInput } from '../form'
import Text from '../Text'

interface MetaProps {
  onSubmit?: () => void
}

export default function MetadataComponent({ onSubmit }: MetaProps): JSX.Element {
  const { updateMeta, metadata, remove } = useAuth()
  const { control, handleSubmit, watch, setValue, reset } = useForm<UserMetadata>()

  const _class = watch('class')
  const _room = watch('room')
  const generateClass = (): SelectItems[] => {
    return Array.from(Array(6).keys()).map((c) => ({
      label: `ม.${c + 1}`,
      value: `${c + 1}`,
    }))
  }

  const generateLevel = (): SelectItems[] => {
    return Array.from(Array(_class && _class >= 4 ? 3 : 4).keys()).map((l) => ({
      label: `${l + 1}`,
      value: `${l + 1}`,
    }))
  }

  useEffect(() => {
    if (_class && _room && _class >= 4 && _room === 4) {
      setValue('room', undefined)
    }
  }, [setValue, _class, _room])

  const formSubmit = async (data: UserMetadata): Promise<void> => {
    const meta = Object.assign({}, data) as UserMetadata
    meta.class = meta.class + '0' + meta.room
    delete meta.room
    try {
      await updateMeta(meta)
      onSubmit && onSubmit()
    } catch (err) {
      alert('ไม่สามารถอัปเดตข้อมูลได้')
    }
  }
  const cancel = async (): Promise<void> => {
    if (metadata) {
      setValue('class', metadata.class.toString().slice(0, 1))
      setValue('room', metadata.class.toString().slice(2))
      setValue('displayName', metadata.displayName)
    } else {
      reset()
      const willRemove = await alertAsync({
        type: 'warning',
        title: 'การลงทะเบียนยังไม่เสร็จสิ้น',
        message: 'หากคุณยกเลิก คุณจำเป็นจะต้องสร้างบัญชีขึ้นใหม่อีกครั้ง',
        buttons: [
          {
            text: 'ยกเลิก',
            style: 'cancel',
          },
          {
            text: 'ตกลง',
            value: true,
          },
        ],
      })
      if (willRemove) {
        try {
          await remove()
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
  useEffect(() => {
    if (!metadata) return
    setValue('class', metadata.class.toString().slice(0, 1))
    setValue('room', metadata.class.toString().slice(2))
    setValue('displayName', metadata.displayName)
  }, [metadata, setValue])

  return (
    <>
      <VStack px="8" py="6" space={4} alignItems="center">
        <TextInput
          fontSize="sm"
          controller={{
            control,
            name: 'displayName',
            label: 'ชื่อ',
            hintText: 'เราจะใช้ชื่อนี้ในการแสดงผลภายในแอพพลิเคชั่น',
          }}
        />
        <HStack space={3}>
          <Box w="1/2">
            <SelectInput
              controller={{
                control,
                label: 'ระดับชั้น',
                name: 'class',
                rules: { required: true, min: 1, max: 6 },
              }}
              placeholder="ระดับชั้น"
              items={generateClass()}
            />
          </Box>
          <Box w="1/2">
            <SelectInput
              controller={{
                control,
                label: 'ห้อง',
                name: 'room',
                rules: { required: true, min: 1, max: 6 },
              }}
              placeholder="ระดับชั้น"
              items={generateLevel()}
            />
          </Box>
        </HStack>
        <VStack pt={3} space={2} w="full">
          <Button
            backgroundColor="green.500"
            rounded="xl"
            py="3"
            _hover={{
              backgroundColor: 'green.400',
            }}
            _pressed={{
              backgroundColor: 'green.400',
            }}
            onPress={handleSubmit(formSubmit)}
          >
            <Text content bold color="white">
              {metadata ? 'บันทึก' : 'ลงทะเบียน'}
            </Text>
          </Button>

          <Button
            backgroundColor="red.500"
            rounded="xl"
            py="3"
            _hover={{
              backgroundColor: 'red.400',
            }}
            _pressed={{
              backgroundColor: 'red.400',
            }}
            onPress={cancel}
          >
            <Text content bold color="white">
              {metadata ? 'รีเซ็ต' : 'ยกเลิก'}
            </Text>
          </Button>
        </VStack>
      </VStack>
    </>
  )
}
