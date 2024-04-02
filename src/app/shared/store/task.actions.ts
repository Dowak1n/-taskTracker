import { createAction, props } from '@ngrx/store';
import {Task} from "../types/user";

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: any }>());
export const updateTask = createAction('[Task] Update Task', props<{ taskId: number, updatedData: Partial<Task> }>());

