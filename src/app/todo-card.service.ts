import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Todo} from "./todo";
import {Project} from "./project";
import {map, tap} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {BehaviorSubject, Subject} from "rxjs";

const INIT_DATA: any[] = [];
const BASE_URL: string = 'https://pacific-temple-51325.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})
export class TodoCardService {
  private projects: Project[] = [];
  private todos: Todo[] = [];

  public ProjectStore$: BehaviorSubject<Project[]> = new BehaviorSubject(INIT_DATA);
  public TodoStore$: BehaviorSubject<Todo[]> = new BehaviorSubject(INIT_DATA);
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient) {  }

  public getProjects() {
    const url = BASE_URL + 'projects.json';
    return this.http.get(url)
      .pipe(map(response => plainToClass(Project, response as Object[])))
      .subscribe(projects => {
        this.projects = projects;
        this.ProjectStore$.next(this.projects);
      })
  }

 public getTodos() {
    const url = BASE_URL + 'todos.json';
    return this.http.get(url)
      .pipe(map(response => plainToClass(Todo, response as Object[])))
      .subscribe(todos => {
        this.todos = todos;
        this.TodoStore$.next(this.todos);
        console.log(this.todos);
      })
  }

  public patchTodo(id: string, isComplited: boolean) {
    const url = BASE_URL + 'todos/' + id + '.json';
    console.log(url);
    return this.http.patch(url, {"isComplited": isComplited})
      .subscribe(response => {
        console.log(response)
      })
  }

  public postProject(title: string) {
    const url = BASE_URL + 'projects.json';
    console.log(url);
    return this.http.post(url, {"title": title})
      .pipe(tap(() => {
        this._refreshNeeded$.next();
      }))
  }

  public postTodo(todo: string, projectId: any) {
    const url = BASE_URL + 'todos.json';
    console.log(url);
    return this.http.post(url, {"text": todo, "isComplited": false, "project_id": projectId})
      .pipe(tap(() => {
        this._refreshNeeded$.next();
      }))
      .subscribe(response => {
        console.log(response);
      })
  }

}

