import { Link, useRouter } from "expo-router";
import { Heading, Stack, Text } from "native-base";
import { Fab } from "ui/components";

export default function CourseIndex() {
  const router = useRouter();
  return (
    <Stack px="3" py="4">
      <Heading fontWeight="800">Hello สวัสดี</Heading>
      <Text>CourseIndex</Text>
      <Link href="/app/courses/view">
        <Text>View</Text>
      </Link>
      <Link href="/app/courses/add">
        <Text>Add</Text>
      </Link>
      <Fab
        size="sm"
        icon="add"
        colorScheme="rianarai"
        onPress={() => router.push("/app/courses/add")}
      />
    </Stack>
  );
}
