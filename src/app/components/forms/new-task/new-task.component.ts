import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html'
})
export class NewTaskComponent implements OnInit {
  newTaskForm: FormGroup;
  onDialogSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.newTaskForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      author: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit(): void {
    this.onDialogSubmit.emit({
      title: this.newTaskForm.get('title')?.value,
      author: this.newTaskForm.get('author')?.value,
      description: this.newTaskForm.get('description')?.value
    });
  }
}
