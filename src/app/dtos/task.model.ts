import { TaskStatusEnum } from "../enum/task-status-enum";

export interface Task {
  id: number,
  status: TaskStatusEnum,
  title: string,
  author: string,
  description: string,
  creation_date: Date,
  update_date: Date
};