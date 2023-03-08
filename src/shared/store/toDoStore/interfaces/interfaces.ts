export interface ITask {
  task: string;
  isDone: boolean;
  id: string;
}

export interface ITodo {
  tasks: ITask[];
  addTask: (tasks: ITask) => void;
  removeTask: (id: string) => void;
  onCheckUnique: (task: string) => boolean;
  toggleStatusByIdTask: (id: string) => void;
  removeAllTasks: () => void;
}
