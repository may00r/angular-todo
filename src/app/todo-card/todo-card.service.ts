import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import {plainToClass, Type, Expose} from "class-transformer";

import {Project} from "./project";
import {Todo} from "./todos";

@Injectable({
  providedIn: 'root'
})
export class TodoCardService {

  projects!: Project;
  todos!: Todo;

  constructor() {  }

}
