/* eslint-disable @typescript-eslint/no-empty-function */
import { BaseGoogleSignIn } from "./base";

export const GoogleSignin: BaseGoogleSignIn = {
  addScopes: () => {
    return undefined;
  },
  configure: () => {},
  hasPlayServices: async () => {
    return true;
  },
  signIn: () => {
    throw new Error("Use `nativeSignIn` function instead.");
  },
  signOut: () => {
    return undefined;
  },
  signInSilently: async () => {
    return {
      idToken: null,
      serverAuthCode: null,
    };
  },
};

export function verifyNativeError(err: any) {
  return false;
}
