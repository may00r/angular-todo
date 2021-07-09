import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, Validators} from '@angular/forms';
import {TodoCardService} from "../todo-card.service";
import {Observable} from "rxjs";
import {Project} from "../project";
import {Todo} from "../todo";
import {pluck} from "rxjs/operators";

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit{
  public projects$: Observable<Project[]> = new Observable<Project[]>();
  public todos$: Observable<Todo[]> = new Observable<Todo[]>();

  todoControl = new FormControl('', Validators.required);
  categoryControl = new FormControl('', Validators.required);

  constructor(
    public todoCardService: TodoCardService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.projects$ = this.todoCardService.ProjectStore$;
    this.todos$ = this.todoCardService.TodoStore$;
  }

  openDialog() {
    this.dialog.open(TodoAddComponent, {
      minHeight: '150px',
      minWidth: '300px',
    });
  }

  newTodo(todo: string, projectId: string, projectTitle: string = '') {
    if (projectId == '') {
      this.todoCardService.postProject(projectTitle)
        .pipe(pluck("id"))
        .subscribe( id => {
          console.log("Project id:", id);
          this.todoCardService.postTodo(todo, id);
        })
    } else {
      this.todoCardService.postTodo(todo, projectId);
      console.log('Post todo');
    }
  }
}
