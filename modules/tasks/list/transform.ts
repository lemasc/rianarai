import { formatDateDistance } from "@/modules/shared/date";
import { Task, TaskListItem } from "../types";

export const transformTaskToListItem = (data: Task[]): TaskListItem[] => {
  let lastDateStr = "";
  return data.reduce<TaskListItem[]>((acc, task, index) => {
    if (index % 3 === 0) {
      const date = task.dueDate ? formatDateDistance(task.dueDate) : undefined;
      if (lastDateStr !== date) {
        lastDateStr = date;
        acc.push({
          type: "dueDate",
          date,
        });
      }
    }
    acc.push({
      type: "task",
      task,
    });
    return acc;
  }, []);
};
