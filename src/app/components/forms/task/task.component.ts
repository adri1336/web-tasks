import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/dtos/task.model';
import { TaskStatusEnum } from 'src/app/enum/task-status-enum';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  TASK_STATUS: any = TaskStatusEnum;

  task: Task;

  taskForm: FormGroup;
  onDialogSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      status: [this.task.status],
      title: [this.task.title, [
        Validators.required
      ]],
      author: [this.task.author, [
        Validators.required
      ]],
      description: [this.task.description, [
        Validators.required
      ]],
      creation_date: [this.task.creation_date, [
        Validators.required
      ]]
    });
  }

  onSubmit(): void {
    this.onDialogSubmit.emit({
      status: parseInt(this.taskForm.get('status')?.value),
      title: this.taskForm.get('title')?.value,
      author: this.taskForm.get('author')?.value,
      description: this.taskForm.get('description')?.value
    });
  }
}
