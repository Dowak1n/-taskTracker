export interface AppState {
  tasks: TaskState;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface Task {
  id: number;
  heading: string;
  name: string;
  deadline: Date;
  priority: string;
  status: string;
  performers: string;
}
