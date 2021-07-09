import { Component, OnInit } from '@angular/core';
import { TodoAddComponent } from "../todo-add/todo-add.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TodoAddComponent]
})
export class HeaderComponent implements OnInit {

  constructor(public todoAddComponent: TodoAddComponent) { }

  ngOnInit(): void {
  }

}
