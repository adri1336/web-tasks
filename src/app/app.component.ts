import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from './dtos/task.model';
import { TaskStatusEnum } from './enum/task-status-enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewTaskComponent } from './components/forms/new-task/new-task.component';
import { TaskComponent } from './components/forms/task/task.component';

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
    switch(event.action) {
      case 'delete':
        this.loadingTaks = true;
        this.http.delete(this.BACKEND_URL + event.id, { responseType: 'text' }).subscribe((response: any) => {
          if(response === "OK") {
            this.snackBar.open("Task deleted!", "", { duration: 3000 });
            this.reloadTasks();
          }
          else this.snackBar.open("Task deletion error!", "", { duration: 3000 });
        });
        break;
      case 'edit':
      case 'view':
        this.openTaskDialog(event.id);
        break;
    }
  }

  addNewTask() {
    let dialogRef = this.matDialog.open(NewTaskComponent, new MatDialogConfig());
    const subscription = dialogRef.componentInstance.onDialogSubmit.subscribe(data => {
      dialogRef.close();
      this.loadingTaks = true;

      const theData = JSON.parse(JSON.stringify(data));
      this.http.post<any>(this.BACKEND_URL, theData).subscribe((response: any) => {
        if(response.status !== 500) {
          this.snackBar.open("Task added!", "", { duration: 3000 });
          this.reloadTasks();
        }
        else this.snackBar.open("Task adding error!", "", { duration: 3000 });
      });
    });
    dialogRef.afterClosed().subscribe(() => {
      subscription.unsubscribe();
    });
  }

  openTaskDialog(taskId: number) {
    const task: any = this.tasks.find(i => i.id == taskId);
    let dialogRef = this.matDialog.open(TaskComponent, new MatDialogConfig());
    dialogRef.componentInstance.task = task;
    const subscription = dialogRef.componentInstance.onDialogSubmit.subscribe(data => {
      dialogRef.close();
      this.loadingTaks = true;

      const theData = JSON.parse(JSON.stringify(data));
      this.http.post<any>(this.BACKEND_URL + taskId, theData).subscribe((response: any) => {
        if(response.status !== 500) {
          this.snackBar.open("Task updated!", "", { duration: 3000 });
          this.reloadTasks();
        }
        else this.snackBar.open("Task update error!", "", { duration: 3000 });
      });
    });
    dialogRef.afterClosed().subscribe(() => {
      subscription.unsubscribe();
    });
  }
}
