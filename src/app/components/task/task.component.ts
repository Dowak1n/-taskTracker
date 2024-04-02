import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EditTaskModalComponent} from "../editTaskModal/editTaskModal.component";
import {MatDialog} from "@angular/material/dialog";
import {AppState, Task} from "../../shared/types/user";
import {TaskService} from "../../shared/services/task.service";
import {Store} from "@ngrx/store";
import {loadTasks} from "../../shared/store/task.actions";

@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  @Input() data!: Task;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadTaskData();
  }

  editTask(): void {
    const dialogRef = this.dialog.open(EditTaskModalComponent, {
      width: '460px',
      data: { id: this.data.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadTaskData();
    });
  }

  loadTaskData(): void {
    this.store.dispatch(loadTasks());
  }

  viewTaskDetails(taskId: string): void {
    this.router.navigate(['/task-details', taskId]);
  }

  protected readonly String = String;
}

