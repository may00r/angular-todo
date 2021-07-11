import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {TodoCardService } from "../todo-card.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../project";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit {
  public projects$: Observable<Project[]> = new Observable<Project[]>();


  todo_card: FormGroup;

  constructor( public todoCardService: TodoCardService, private http: HttpClient, fb: FormBuilder) {
    this.todo_card = fb.group({});
  }

  ngOnInit(): void {
    this.projects$ = this.todoCardService.ProjectStore$;
  }

  checkChange(todoId: string, isComplited: boolean, projectId: number) {
    this.todoCardService.patchTodo(todoId, isComplited, projectId);
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

}
