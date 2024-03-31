import { Text } from "@/theme/ui";
import { Task } from "../types";
import { Pressable, View } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
export const TaskItem = ({ task }: { task: Task }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          console.log("Toggle task", task.id);
        }}
      >
        <FontAwesome
          name={task.completed ? "check-circle" : "check-circle-o"}
          color={task.completed ? "#16a34a" : "#4b5563"}
          size={36}
        />
      </Pressable>
      <View style={{ flexGrow: 1 }}>
        <Text weight="semiBold">{task.title}</Text>
        <Text size="sm">{task.dueDate.toDateString()}</Text>
      </View>
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          console.log("Star task", task.id);
        }}
        style={{ justifyContent: "center" }}
      >
        <MaterialCommunityIcons
          name={task.completed ? "clock-check" : "clock-plus-outline"}
          color={task.completed ? "#026CA7" : "#4b5563"}
          size={30}
        />
        {task.completed ? (
          <Text
            style={[{ textAlign: "center", color: "#026CA7" }]}
            size="sm"
            weight="medium"
          >
            2 วัน
          </Text>
        ) : null}
      </Pressable>
    </View>
  );
};
