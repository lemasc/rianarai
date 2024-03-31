export type Task = {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: Date;
};

export type TaskListItem =
  | {
      type: "task";
      task: Task;
    }
  | {
      type: "dueDate";
      date: string;
    };
