import { useEffect, useState } from 'react'
import { ImageBackground, Keyboard } from 'react-native'
import { Box, ScrollView, Stack, IStackProps } from 'native-base'

import { useAuth } from '@rianarai/ui-shared/context/auth'
import { useBreakpoint } from '../hooks/useBreakpoint'
import Text from '../components/Text'
import Brand from '../components/layout/brand'
import { SignInComponent, MetadataComponent } from '../components/auth'

import hero from '../assets/images/hero.jpg'

interface SPAProps {
  render: () => JSX.Element
  title: string
  desc: string
}

function MultiComponent(nextProps: SPAProps): JSX.Element {
  const { ready } = useAuth()
  const [props, setProps] = useState<SPAProps>(nextProps)
  useEffect(() => {
    if (ready && nextProps.title !== props.title) {
      setProps(nextProps)
    }
  }, [nextProps, props, ready])

  return (
    <Box>
      <ScrollView>
        <Box
          p="8"
          borderBottomColor="gray.200"
          _dark={{ borderBottomColor: 'gray.600' }}
          borderBottomWidth="1"
        >
          <Brand pb="3" />
          <Text isTruncated py="4" fontSize="2xl" fontFamily="Kodchasan-600">
            {props.title}
          </Text>
          <Text>{props.desc}</Text>
        </Box>
        {props.render()}
        <Text textAlign="center" fontSize="xs" py="4">
          Version 3.0.0-beta.2
        </Text>
      </ScrollView>
    </Box>
  )
}

export default function ToSignInScreen() {
  const { user } = useAuth()
  const [kbShown, setKbShown] = useState(false)
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKbShown(true))
    const hide = Keyboard.addListener('keyboardDidHide', () => setKbShown(false))
    return () => {
      show.remove()
      hide.remove()
    }
  }, [])
  const stackProps = useBreakpoint<IStackProps>({
    base: {
      w: 'full',
      roundedTop: !kbShown ? 'xl' : undefined,
    },
    lg: {
      h: 'full',
      maxWidth: '2/5',
      roundedTop: 'none',
    },
  })

  return (
    <ImageBackground
      source={hero}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        flex={1}
        flexDirection={useBreakpoint({ base: 'row', lg: 'column' })}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Stack {...stackProps} bg="white" _dark={{ bg: 'gray.800' }} shadow="1">
          <Box justifyContent="center">
            {!user ? (
              <MultiComponent
                title="ยินดีต้อนรับ"
                desc="เข้าสู่ระบบเพื่อแสดงข้อมูลในรายวิชา จัดการงานที่ได้รับมอบหมาย และอื่น ๆ"
                render={() => <SignInComponent />}
              />
            ) : (
              <MultiComponent
                title={`สวัสดี ${user.displayName}`}
                desc="กรอกข้อมูลอีกเล็กน้อยเพื่อดำเนินการลงทะเบียนให้เสร็จสิ้น"
                render={() => <MetadataComponent />}
              />
            )}
          </Box>
        </Stack>
      </Box>
    </ImageBackground>
  )
}
