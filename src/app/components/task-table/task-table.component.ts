import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/dtos/task.model';
import { TaskStatusEnum } from 'src/app/enum/task-status-enum';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent {
  @Input() title: string = "";
  @Input() tasks: Task[] = [];
  @Output() onActionEvent: EventEmitter<any> = new EventEmitter();
  
  TASK_STATUS: any = TaskStatusEnum;

  columnsToDisplay = ['id', 'title', 'author', 'actions'];
  
  constructor() { }

  onActionClick(id: number, action: string) {
    this.onActionEvent.emit({ id: id, action: action });
  }
}
