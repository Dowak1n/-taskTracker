import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import {Task} from "../types/user";

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

export const taskReducer = createReducer(
  initialState,

  on(TaskActions.loadTasks, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    loading: false,
    error: null
  })),

  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
