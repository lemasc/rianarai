import { Link, useRouter } from "expo-router";
import { Stack, Text } from "native-base";

export default function CourseView() {
  const router = useRouter();
  return (
    <Stack>
      <Text>CourseView</Text>
      <Text onPress={() => router.back()}>Back</Text>
    </Stack>
  );
}
