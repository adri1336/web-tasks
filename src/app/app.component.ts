import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from './dtos/task.model';
import { TaskStatusEnum } from './enum/task-status-enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewTaskComponent } from './components/forms/new-task/new-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private BACKEND_URL: string = "http://localhost:3000/task/";

  TASK_STATUS: any = TaskStatusEnum;

  loadingTaks: boolean = true;
  tasks: Task[] = [];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.reloadTasks();
  }

  reloadTasks(): void {
    this.loadingTaks = true;
    this.http.get<Task[]>(this.BACKEND_URL).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.loadingTaks = false;
    });
  }

  getTasks(status: TaskStatusEnum): Task[] {
    return this.tasks
      .filter(i => i.status === status)
      .sort((a, b) => (new Date(b.update_date).getTime() - new Date(a.update_date).getTime()))
  }

  onTaskTableAction(event: any) {
    console.log("id: " + event.id + ", action: " + event.action);
    switch(event.action) {
      case 'delete':
        this.http.delete<any>(this.BACKEND_URL + event.id).subscribe((response: any) => {
          if(response.status === 200) {
            this.snackBar.open("Task deleted!", "", { duration: 3000 });
            this.reloadTasks();
          }
          else this.snackBar.open("Task deletion error!", "", { duration: 3000 });
        });
        break;
    }
  }

  addNewTask() {

    this.matDialog.open(NewTaskComponent, new MatDialogConfig());
  }
}
