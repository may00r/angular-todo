import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {TodoCardService } from "../todo-card.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "../todo";
import {Project} from "../project";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit {
  public projects$: Observable<Project[]> = new Observable<Project[]>();
  public todos$: Observable<Todo[]> = new Observable<Todo[]>();

  todo_card: FormGroup;

  constructor( public todoCardService: TodoCardService, private http: HttpClient, fb: FormBuilder) {
    this.todo_card = fb.group({});

  }

  ngOnInit(): void {
    this.projects$ = this.todoCardService.ProjectStore$;
    this.todos$ = this.todoCardService.TodoStore$;
  }

  // 'https://pacific-temple-51325.herokuapp.com/projects.json'

  checkChange(a: string, c: boolean) {
    console.log(a, c);
    this.todoCardService.patchTodo(a, c);
  }
}
