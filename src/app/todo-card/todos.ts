import { Expose } from "class-transformer";

export class Todo {
  id?: number;
  text?: string;
  isComplited?: boolean;
  project_id?: number;
}

