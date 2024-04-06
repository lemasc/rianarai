import { Slot } from "expo-router";

import { useFonts } from "@/theme/fonts";

export default function RootLayout() {
  const [fontsLoaded] = useFonts();
  if (!fontsLoaded) {
    return null;
  }
  return <Slot />;
}
