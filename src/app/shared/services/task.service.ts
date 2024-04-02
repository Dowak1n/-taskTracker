import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppState, Task} from "../types/user";
import {Store} from "@ngrx/store";
import * as TaskActions from '../store/task.actions';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'userData';

  constructor(private store: Store<AppState>) {}

  loadTasks(): Observable<Task[]> {
    try {
      const tasksJson = localStorage.getItem(this.localStorageKey);
      if (tasksJson) {
        const tasks: Task[] = JSON.parse(tasksJson);
        this.store.dispatch(TaskActions.loadTasksSuccess({ tasks }));
        return of(tasks);
      } else {
        this.store.dispatch(TaskActions.loadTasksSuccess({ tasks: [] }));
        return of([]);
      }
    } catch (error) {
      this.store.dispatch(TaskActions.loadTasksFailure({ error }));
      return of([]);
    }
  }

  updateTask(taskId: number, updatedData: Partial<Task>): Observable<Task[]> {
    try {
      const tasksJson = localStorage.getItem(this.localStorageKey);
      if (tasksJson) {
        const tasks: Task[] = JSON.parse(tasksJson);
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, ...updatedData };
          }
          return task;
        });
        localStorage.setItem(this.localStorageKey, JSON.stringify(updatedTasks));
        this.store.dispatch(TaskActions.loadTasksSuccess({ tasks: updatedTasks }));
        return of(updatedTasks);
      }
      return of([]);
    } catch (error) {
      this.store.dispatch(TaskActions.loadTasksFailure({ error }));
      return of([]);
    }
  }
}
