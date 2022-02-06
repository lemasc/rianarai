import {
  NativeModuleError,
  statusCodes
} from '@react-native-google-signin/google-signin'
import { isObject } from '@rianarai/shared/helpers'

export function verifyNativeError(err: never) {
  return (
    isObject(err) &&
    (err as unknown as NativeModuleError).code &&
    (err as unknown as NativeModuleError).code === statusCodes.SIGN_IN_REQUIRED
  )
}

export { GoogleSignin } from '@react-native-google-signin/google-signin'
