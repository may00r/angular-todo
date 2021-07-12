import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Project} from "./project";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {BehaviorSubject} from "rxjs";
import {environment} from "../environments/environment";

const INIT_DATA: Project[] = [];
const BASE_URL: string = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class TodoCardService {
  public projects: Project[] = [];
  public ProjectStore$: BehaviorSubject<Project[]> = new BehaviorSubject(INIT_DATA);

  constructor(private http: HttpClient) {  }

  public getProjects() {
    const url: string = BASE_URL + 'projects';
    return this.http.get<Project[]>(url)
      .pipe(map(response => plainToClass(Project, response)))
      .subscribe(projects => {
        this.projects = projects;
        this.ProjectStore$.next(this.projects);
      })
  }

  public patchTodo(id: string, isComplited: boolean, projectId: number) {
    const url: string = BASE_URL + 'projects/' + projectId + '/todos/' + id;
    return this.http.patch<Project>(url, {"isComplited": isComplited})
      .subscribe(response => {
        console.log(response)
      })
  }

  public postProject(title: string) {
    const url: string = BASE_URL + 'projects';
    return this.http.post<Project>(url, {"title": title})
  }

  public postTodo(todo: string, projectId: number) {
    const url: string = BASE_URL + 'projects/' + projectId + '/todos';
    return this.http.post<Project>(url, {"text": todo, "isComplited": false, "project_id": projectId})
      .pipe(map(response => plainToClass(Project, response)))
      .subscribe(response => {
        this.projects[projectId - 1] = response;
        this.ProjectStore$.next(this.projects);
      })
  }

}

