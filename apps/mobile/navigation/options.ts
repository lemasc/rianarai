import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { contentFont } from '@rianarai/ui-shared/fonts'

export const screenOptions: NativeStackNavigationOptions = {
  headerTitleStyle: {
    ...contentFont(true, 'Kanit'),
  },
}
