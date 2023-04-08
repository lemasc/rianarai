import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { auth } from "../firebase";

export async function signInWithGoogle() {
  await GoogleSignin.signOut();
  const user = await GoogleSignin.signIn();
  if (!user.idToken) {
    throw new Error("No idToken returned from Google Signin");
  }
  return auth().signInWithCredential(
    auth.GoogleAuthProvider.credential(user.idToken)
  );
}

export async function signOut() {
  await auth().signOut();
  // Only sign out from Firebase. Other providers will be signed out automatically.
}
