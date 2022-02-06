import { Ionicons } from '@expo/vector-icons'
import { FlatList, HStack, Icon, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { SettingsParamList, SettingsScreenProps } from '../../navigation/types'
import { useAuth } from '@rianarai/ui-shared/context/auth'
import Text from '../../components/Text'
import PressableItem from '../../components/PressableItem'
import Container from '../../components/layout/container'

type SettingsNavigation = {
  title: string
  desc?: string
  screen?: keyof SettingsParamList
  onPress?: () => void
  icon: string
}

function SettingsItem({ item }: { item: SettingsNavigation }) {
  const navigation = useNavigation<SettingsScreenProps<'Index'>['navigation']>()
  return (
    <PressableItem
      px="6"
      py="4"
      onPress={() => {
        if (item.screen) {
          return navigation.navigate('Settings', {
            screen: item.screen,
            initial: false,
          })
        }
        item.onPress && item.onPress()
      }}
    >
      <HStack space={8} alignItems={'center'}>
        <Icon as={Ionicons} name={item.icon} size={7} />
        <VStack space={1} flexGrow={1}>
          <Text fontSize={'md'} fontWeight={'semibold'}>
            {item.title}
          </Text>
          {item.desc && (
            <Text fontSize="xs" opacity={0.7}>
              {item.desc}
            </Text>
          )}
        </VStack>
        <Icon as={Ionicons} name="chevron-forward" size={5} />
      </HStack>
    </PressableItem>
  )
}
export default function SettingsScreen() {
  const { signOut } = useAuth()
  const navigation: SettingsNavigation[] = [
    {
      title: 'ตั้งค่าบัญชี',
      desc: 'แก้ไขข้อมูลส่วนตัว',
      screen: 'Profile',
      icon: 'person',
    },
    {
      title: 'เกี่ยวกับ RianArai',
      screen: 'About',
      icon: 'information-circle',
    },
    {
      title: 'ออกจากระบบ',
      icon: 'log-out',
      onPress: () => signOut(),
    },
  ]
  return (
    <Container fullscreen>
      <FlatList
        data={navigation}
        renderItem={({ item }) => <SettingsItem item={item} />}
        keyExtractor={(item) => item.title}
      />
    </Container>
  )
}
