import { Component, OnInit } from '@angular/core';

import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    // TODO: handle the error
    this.todoService
      .getTodos()
      .subscribe(todos => this.todos = todos);
  }

  update(todo: Todo): void {
    // TODO: handle the error
    this.todoService
      .updateTodo(todo)
      .subscribe();
  }

  delete(todo: Todo): void {
    // TODO: handle the error
    this.todoService
      .deleteTodo(todo)
      .subscribe(() => this.todos = this.todos.filter(t => t.id !== todo.id));
  }
}
