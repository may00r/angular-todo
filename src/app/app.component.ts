import {Component, OnInit, ApplicationRef} from '@angular/core';
import {TodoCardService} from "./todo-card.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-todos';

  constructor(public todoCardService: TodoCardService, public app: ApplicationRef) {  }

  ngOnInit() {
    this.todoCardService.getProjects();
  }
}
