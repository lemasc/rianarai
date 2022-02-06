import { Box, Button, Link, useColorModeValue, useToast } from 'native-base'
import { useAuth } from '@rianarai/ui-shared/context/auth'
import GoogleIcon from '../icon/google'
import Text from '../Text'

export default function NotSignInComponent() {
  const toast = useToast()
  const { signInWithGoogle } = useAuth()
  const signIn = async () => {
    try {
      await signInWithGoogle()
    } catch (err) {
      const id = 'signIn-error'
      if (!toast.isActive(id)) {
        toast.show({
          id,
          status: 'error',
          title: 'ไม่สามารถเข้าสู่ระบบได้',
          mx: 8,
          maxW: 'sm',
        })
      }
    }
  }
  const backgroundColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box px="8" py="6" alignItems="center">
      <Button
        backgroundColor={useColorModeValue('gray.50', 'gray.900')}
        rounded="xl"
        py="3"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        borderWidth="1"
        _hover={{
          backgroundColor,
        }}
        _pressed={{
          backgroundColor,
        }}
        w="full"
        leftIcon={<GoogleIcon width={24} height={24} size="sm" marginRight="2" />}
        onPress={signIn}
      >
        <Text color={useColorModeValue('gray.500', 'gray.300')} fontFamily={'Roboto-600'}>
          Sign in with Google
        </Text>
      </Button>
      <Text fontSize="sm" py="4" color="gray.500">
        ใช้บัญชีหลักที่เชื่อมต่อกับ Google Classroom
      </Text>
      <Text fontSize="xs" color="gray.400">
        ระบบอาจแสดงหน้าจอคำยินยอมในการเข้าถึงข้อมูล
      </Text>
      <Text fontSize="xs" color="gray.400">
        (Consent)
      </Text>
      <Link isExternal href={`${process.env.NEXT_PUBLIC_ENDPOINT}/docs/classroom`}>
        <Text fontSize="xs" color="blue.500" underline>
          เรียนรู้เพิ่มเติมเกี่ยวกับสิทธิต่าง ๆ ที่ใช้
        </Text>
      </Link>
    </Box>
  )
}
