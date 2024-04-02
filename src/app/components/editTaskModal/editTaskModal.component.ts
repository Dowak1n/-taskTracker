import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../shared/types/user";
import {TaskService} from "../../shared/services/task.service";

@Component({
  selector: 'editTaskModal',
  templateUrl: './editTaskModal.component.html',
  styleUrl: './editTaskModal.component.scss'
})
export class EditTaskModalComponent {
  newStatus!: string;
  newPerformers!: string;

  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService
  ) {}

  saveChanges(): void {
    this.taskService.updateTask(this.data.id, {
      status: this.newStatus,
      performers: this.newPerformers
    }).subscribe(() => {
      this.dialogRef.close();
    });
  }

  cancelEdit(): void {
    this.dialogRef.close();
  }
}
