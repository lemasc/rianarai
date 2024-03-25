import { useFonts } from "@/theme/fonts";
import { Slot } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts();
  if (!fontsLoaded) {
    return null;
  }
  return <Slot />;
}
