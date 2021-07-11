import {Type} from "class-transformer";
import {Todo} from "./todo";

export class Project {
  id: number = 0;
  title: string = '';
  @Type(() => Todo)
  todos: Todo[] = [];
}


