import { Ionicons } from "@expo/vector-icons";
import { imports } from "config/fonts";
import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { userStore } from "mobile/features/user";
import Providers from "mobile/provider";

export default function App() {
  const isInitialized = userStore((state) => state.isInitialized);
  const [loaded] = useFonts({
    ...imports,
    ...Ionicons.font,
  });

  return (
    <Providers>
      {loaded && isInitialized ? (
        <Stack screenOptions={{ headerShown: false }} />
      ) : (
        <SplashScreen />
      )}
    </Providers>
  );
}
