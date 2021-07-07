import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {TodoCardService } from "./todo-card.service";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {plainToClass} from "class-transformer";



@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  providers: [ TodoCardService ]
})
export class TodoCardComponent implements OnInit {
  projects: TodoCardService | any;
  todos: TodoCardService | any;

  todo_card: FormGroup;

  b = true;

  constructor(private http: HttpClient, fb: FormBuilder) {
    this.todo_card = fb.group({});
    this.getProjects('http://127.0.0.1:3000/projects.json')
    this.getTodos('http://127.0.0.1:3000/todos.json')
  }

  ngOnInit(): void {

  }

  getProjects(url: string) {
    this.http.get(url)
      .pipe(map(response => {
        const r = plainToClass(TodoCardService, response);
        console.log(r);
        return r;
      }))
      .subscribe(r => {
        this.projects = r;
      })
  }

  getTodos(url: string) {
    this.http.get(url)
      .pipe(map(response => {
        const r = plainToClass(TodoCardService, response);
        console.log(r);
        return r;
      }))
      .subscribe(r => {
        this.todos = r;
      })
  }


  // 'https://pacific-temple-51325.herokuapp.com/projects.json'

  checkInfo(a: number) {
    console.log(a)
  }
}
