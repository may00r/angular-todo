import {Component, OnInit} from '@angular/core';
import {TodoCardService} from "./todo-card.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-todos';

  constructor(public todoCardService: TodoCardService) {  }

  ngOnInit() {
    this.todoCardService.refreshNeeded$
      .subscribe(() => {
        this.todoCardService.getProjects();
        this.todoCardService.getTodos();
      });

    this.todoCardService.getProjects();
    this.todoCardService.getTodos();
  }

}
