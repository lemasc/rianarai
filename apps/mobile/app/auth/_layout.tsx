import { Slot } from "expo-router";
import { Stack } from "native-base";

export default function AuthLayout() {
  return (
    <Stack display="flex" justifyContent="center" alignItems="center" h="100%">
      <Slot />
    </Stack>
  );
}
