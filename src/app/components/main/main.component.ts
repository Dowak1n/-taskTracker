import {Component, OnInit} from '@angular/core';
import {AppState, Task} from "../../shared/types/user";
import {select, Store} from "@ngrx/store";
import {loadTasks} from "../../shared/store/task.actions";
import {Observable, tap} from "rxjs";
import {selectTasks} from "../../shared/store/ task.selectors";
import {map} from "rxjs/operators";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  userData$!: Observable<Task[]>;
  sortByDeadlineAsc: boolean = true;
  sortByStatusAsc: boolean = true;
  sortByPerformersAsc: boolean = true;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadTasks();
    this.userData$ = this.store.pipe(select(selectTasks));
  }

  loadTasks(): void {
    this.store.dispatch(loadTasks());
  }


  sortByStatus(): void {
    this.sortByStatusAsc = !this.sortByStatusAsc;
    this.userData$ = this.userData$.pipe(
      map(tasks => [...tasks].sort((a, b) => {
        const order = this.sortByStatusAsc ? 1 : -1;
        return order * a.status.localeCompare(b.status);
      }))
    );
  }

  sortByPerformers(): void {
    this.sortByPerformersAsc = !this.sortByPerformersAsc;
    this.userData$ = this.userData$.pipe(
      map(tasks => [...tasks].sort((a, b) => {
        const order = this.sortByPerformersAsc ? 1 : -1;
        return order * a.performers.localeCompare(b.performers);
      }))
    );
  }

  sortByDeadline(): void {
    this.sortByDeadlineAsc = !this.sortByDeadlineAsc;
    this.userData$ = this.userData$.pipe(
      map(tasks => [...tasks].sort((a, b) => {
        const dateA = new Date(a.deadline).getTime();
        const dateB = new Date(b.deadline).getTime();
        const order = this.sortByDeadlineAsc ? 1 : -1;
        return order * (dateA - dateB);
      }))
    );
  }
}
