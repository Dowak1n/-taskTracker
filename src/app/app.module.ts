import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppComponent} from "./app.component";
import {TaskComponent} from "./components/task/task.component";

import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormTaskComponent} from "./components/formTask/formTask.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MainComponent} from "./components/main/main.component";
import {DetailsTaskComponent} from "./components/detailsTask/detailsTask.component";
import {EditTaskModalComponent} from "./components/editTaskModal/editTaskModal.component";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {TaskService} from "./shared/services/task.service";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {taskReducer} from "./shared/store/task.reducer";
import {TaskEffects} from "./shared/store/task.effects";

const routes: Routes = [
  { path: 'view-tasks', component: MainComponent },
  { path: 'create-task', component: FormTaskComponent },
  { path: 'task-details/:id', component: DetailsTaskComponent },
  { path: '', redirectTo: '/view-tasks', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,TaskComponent, FormTaskComponent, MainComponent, DetailsTaskComponent, EditTaskModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatCardActions,
    MatButton,
    MatInput,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatToolbar,
    RouterOutlet,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({tasks: taskReducer}),
    EffectsModule.forRoot([TaskEffects])
  ],
  providers: [
    TaskService
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
