import { ViewHeaderButtons } from "mobile/features/teachers";
import { NestedStack } from "ui/navigation";

export default function TeachersLayout() {
  return (
    <NestedStack>
      <NestedStack.Screen
        name="index"
        options={{
          title: "ครูผู้สอน",
        }}
      />
      <NestedStack.Screen
        name="view"
        options={{
          title: "",
          headerRight: ViewHeaderButtons,
          headerTransparent: true,
        }}
      />
      <NestedStack.Screen
        name="add"
        options={{ presentation: "bottomSheet" }}
      />
      <NestedStack.Screen
        name="edit"
        options={{ presentation: "bottomSheet" }}
      />
      <NestedStack.Screen
        name="delete"
        options={{ presentation: "bottomSheet" }}
      />
    </NestedStack>
  );
}
