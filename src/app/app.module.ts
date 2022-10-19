import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { NewTaskComponent } from './components/forms/new-task/new-task.component';
import { TaskComponent } from './components/forms/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskTableComponent,
    NewTaskComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
