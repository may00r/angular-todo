import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, Validators} from '@angular/forms';
import {TodoCardService} from "../todo-card.service";
import {Observable} from "rxjs";
import {Project} from "../project";
import {pluck} from "rxjs/operators";

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent implements OnInit{
  public projects$: Observable<Project[]> = new Observable<Project[]>();

  todoControl = new FormControl('', Validators.required);
  categoryControl = new FormControl('', Validators.required);

  constructor(
    public todoCardService: TodoCardService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.projects$ = this.todoCardService.ProjectStore$;
  }

  openDialog() {
    this.dialog.open(TodoAddComponent, {
      minHeight: '150px',
      minWidth: '300px',
    });
  }

  newTodo(todo: string, projectId: number, projectTitle: string = '') {
    if (!projectId) {
      this.todoCardService.postProject(projectTitle)
        .pipe<number>(pluck("id"))
        .subscribe( id => {
          this.todoCardService.postTodo(todo, id);
        })
    } else {
      this.todoCardService.postTodo(todo, projectId);
    }
  }

  trackByFn(index: number) {
    return index;
  }

}
