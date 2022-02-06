import { Platform } from 'react-native'
import Constants from 'expo-constants'
import { Link, VStack } from 'native-base'

import Text from '../../components/Text'
import FormContainer from '../../components/FormContainer'
import Container from '../../components/layout/container'
import Brand from '../../components/layout/brand'

export default function AboutScreen() {
  const upper = (text: string) => text.slice(0, 1).toUpperCase() + text.slice(1)
  const formatOSString = () => {
    const ios = Constants.platform?.ios
    if (!ios) return `${upper(Platform.OS)} ${Constants.systemVersion} (${Constants.deviceName})`
    return `iOS ${ios.systemVersion} (${ios.platform})`
  }
  return (
    <Container>
      <VStack space={8} px="3">
        <VStack space={4}>
          <Brand />
          <Text opacity={0.8}>เครื่องมือเดียวสำหรับการเรียนออนไลน์</Text>
        </VStack>
        <FormContainer>
          <Text>เวอร์ชั่น:</Text>
          <Text>{Constants.manifest?.extra?.rootVersion}</Text>
          <Text>เวอร์ชั่นไคลเอนท์:</Text>
          <Text>{Constants.nativeAppVersion}</Text>
          <Text>บิวด์ของไคลเอนท์:</Text>
          <Text>{Constants.nativeBuildVersion}</Text>
          <Text>แชนแนลของบิวด์:</Text>
          <Text>Insider</Text>
          <Text>ระบบปฎิบัติการ:</Text>
          <Text>{formatOSString()}</Text>
        </FormContainer>

        <VStack space={4}>
          <Text color="gray.500" content>
            สงวนลิขสิทธิ์ 2021-{new Date().getFullYear()} Lemasc Service Co., ltd
          </Text>
          <Link isExternal href={`${process.env.NEXT_PUBLIC_ENDPOINT}`}>
            <Text color="blue.600" underline content>
              เว็บไซต์ RianArai
            </Text>
          </Link>
          <Link isExternal href={`${process.env.NEXT_PUBLIC_ENDPOINT}/docs/privacy`}>
            <Text color="blue.600" underline content>
              นโยบายความเป็นส่วนตัว
            </Text>
          </Link>
        </VStack>
      </VStack>
    </Container>
  )
}
