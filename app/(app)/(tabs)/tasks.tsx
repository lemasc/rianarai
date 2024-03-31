import { Text } from "@/theme/ui";
import { FlashListProps, ListRenderItem } from "@shopify/flash-list";
import { FlashListWithHeaders, ScrollableWithHeader } from "@/theme/scrollable";
import { Link } from "expo-router";
import { add } from "date-fns";
import { useCallback } from "react";
import { Task, TaskListItem } from "@/modules/tasks/types";
import { transformTaskToListItem } from "@/modules/tasks/list/transform";
import { Pressable } from "react-native";
import { TaskItem } from "@/modules/tasks/list/TaskItem";

const Header = () => (
  <>
    <Text style={{ color: "white" }} size="lg">
      สวัสดี <Text weight="bold">สานสา</Text>
    </Text>
    <Text style={{ color: "white" }} size="sm">
      ไหนเลื่อนใหม่ดิ๊
    </Text>
  </>
);

const LargeHeader = () => (
  <>
    <Text style={{ color: "white" }} size="4xl">
      สวัสดี <Text weight="bold">สานสา</Text>
    </Text>
    <Text style={{ color: "white" }} size="lg">
      แอนิเมชั่นลื่นมาก สุดยอด
    </Text>
  </>
);

const data = new Array(100).fill(0).map<Task>((_, index) => ({
  id: index,
  title: `Task ${index}`,
  completed: index % 2 === 0,
  dueDate: add(new Date(), { days: Math.floor(index / 3) - 2 }),
}));

const renderedData = transformTaskToListItem(data);

export default function Tasks() {
  const renderItem = useCallback<ListRenderItem<TaskListItem>>(
    ({ index, item }) => {
      if (item.type === "dueDate") {
        return (
          <Text
            style={{
              paddingTop: 35,
              paddingBottom: 10,
              paddingHorizontal: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#bfbfbf",
            }}
            weight="bold"
            size="2xl"
          >
            {item.date}
          </Text>
        );
      }
      return (
        <Link href={`/tasks/${index}`} asChild>
          <Pressable
            android_ripple={{ color: "#d1d5db" }}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              flex: 1,
              borderBottomColor: "#d1d5db",
              borderBottomWidth: 1,
            }}
          >
            <TaskItem task={item.task} />
          </Pressable>
        </Link>
      );
    },
    []
  );
  return (
    <ScrollableWithHeader<FlashListProps<TaskListItem>>
      Component={FlashListWithHeaders}
      HeaderComponent={Header}
      LargeHeaderComponent={LargeHeader}
      data={renderedData}
      extraData={null}
      // estimatedItemSize={49}
      contentContainerStyle={{ paddingTop: 0, backgroundColor: "white" }}
      getItemType={(item) => item.type}
      renderItem={renderItem}
    />
  );
}
