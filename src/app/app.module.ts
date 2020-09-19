import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoSearchComponent } from './components/todo-search/todo-search.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { AlertsComponent } from './components/alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoListItemComponent,
    TodoDetailComponent,
    TodoCreateComponent,
    TodoSearchComponent,
    DashboardComponent,
    HeaderComponent,
    AlertsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
