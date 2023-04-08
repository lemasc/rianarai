import { Link } from "expo-router";
import { Heading, Stack, Text } from "native-base";

export default function CourseIndex() {
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
    </Stack>
  );
}
