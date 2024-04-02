import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Task} from "../../shared/types/user";

@Component({
  selector: 'form-task-component',
  templateUrl: './formTask.component.html',
  styleUrl: './formTask.component.scss'
})
export class FormTaskComponent {
  userDataForm: FormGroup;
  currentId: number = 1;

  constructor(private formBuilder: FormBuilder) {
    this.userDataForm = this.formBuilder.group({
      id: [this.currentId],
      heading: [''],
      name: [''],
      deadline: [''],
      priority: [''],
      status: [''],
      performers: ['']
    });
  }

  onSave() {
    const formData: Task = this.userDataForm.value;

    let userDataArray: Task[] = JSON.parse(localStorage.getItem('userData') || '[]');
    userDataArray.push(formData);
    localStorage.setItem('userData', JSON.stringify(userDataArray));

    this.currentId++;
    this.userDataForm.patchValue({ id: this.currentId });
  }
}

