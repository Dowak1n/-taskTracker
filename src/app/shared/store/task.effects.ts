import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TaskActions from './task.actions';
import {TaskService} from "../services/task.service";

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() => this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() => this.taskService.loadTasks()
        .pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskActions.loadTasksFailure({ error })))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}
}
