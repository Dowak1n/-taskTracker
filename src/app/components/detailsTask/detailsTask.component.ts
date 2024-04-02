import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Task} from "../../shared/types/user";
import {TaskService} from "../../shared/services/task.service";

@Component({
  selector: 'details-task-component',
  templateUrl: './detailsTask.component.html',
  styleUrl: './detailsTask.component.scss'
})
export class DetailsTaskComponent implements OnInit {
  taskId!: string;
  taskData!: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.taskId = id;
        this.loadTaskData();
      } else {
        console.log("id равен null")
      }
    });
  }

  loadTaskData(): void {
    this.taskService.loadTasks().subscribe(tasks => {
      const foundTask = tasks.find(task => task.id === +this.taskId);
      if (foundTask) {
        this.taskData = foundTask;
        console.log(this.taskData);
      } else {
        console.error(`Task with ID ${this.taskId} not found.`);
      }
    });
  }
}
