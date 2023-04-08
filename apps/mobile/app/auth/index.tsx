import { Redirect } from "expo-router";

export default function RedirectToSignIn() {
  return <Redirect href="/auth/signin" />;
}
