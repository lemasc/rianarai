import { NestedStack } from "ui/navigation";

export default function CourseLayout() {
  return (
    <NestedStack>
      <NestedStack.Screen
        name="index"
        options={{
          title: "รายวิชา",
        }}
      />
      <NestedStack.Screen
        name="view"
        options={{
          title: "ข้อมูลรายวิชา",
        }}
      />
      <NestedStack.Screen
        name="add"
        options={{
          title: "เพิ่มรายวิชา",
          presentation: "bottomSheet",
        }}
      />
    </NestedStack>
  );
}
