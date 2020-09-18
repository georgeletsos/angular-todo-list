import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { TodosComponent } from '../app/components/todos/todos.component';
import { TodoDetailComponent } from '../app/components/todo-detail/todo-detail.component';
import { TodoCreateComponent } from '../app/components/todo-create/todo-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'todos/create', component: TodoCreateComponent },
  { path: 'todos/:id', component: TodoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
