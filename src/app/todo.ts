import { Expose } from "class-transformer";

export class Todo {
  id: number = 0;
  text: string = '';
  isComplited: boolean = false;
  project_id: number = 0;
}
