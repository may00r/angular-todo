import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { HttpClientModule } from "@angular/common/http";
import {TodoCardService} from "./todo-card/todo-card.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [TodoCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
