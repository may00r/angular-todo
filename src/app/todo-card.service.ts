import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Project} from "./project";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {BehaviorSubject} from "rxjs";
import {environment} from "../environments/environment";

const INIT_DATA: any[] = [];
const BASE_URL: string = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class TodoCardService {
  public projects: Project[] = [];
  public ProjectStore$: BehaviorSubject<Project[]> = new BehaviorSubject(INIT_DATA);

  constructor(private http: HttpClient) {  }

  public getProjects() {
    const url = BASE_URL + 'projects';
    return this.http.get(url)
      .pipe(map(response => plainToClass(Project, response as Object[])))
      .subscribe(projects => {
        this.projects = projects;
        this.ProjectStore$.next(this.projects);
      })
  }

  public patchTodo(id: string, isComplited: boolean, projectId: number) {
    const url = BASE_URL + 'projects/' + projectId + '/todos/' + id;
    return this.http.patch(url, {"isComplited": isComplited})
      .subscribe(response => {
        console.log(response)
      })
  }

  public postProject(title: string) {
    const url = BASE_URL + 'projects';
    return this.http.post(url, {"title": title})
  }

  public postTodo(todo: string, projectId: any) {
    const url = BASE_URL + 'projects/' + projectId + '/todos';
    return this.http.post(url, {"text": todo, "isComplited": false, "project_id": projectId})
      .pipe(map(response => plainToClass(Project, response as Object)))
      .subscribe(response => {
        this.projects[projectId - 1] = response;
        this.ProjectStore$.next(this.projects);
      })
  }

}

