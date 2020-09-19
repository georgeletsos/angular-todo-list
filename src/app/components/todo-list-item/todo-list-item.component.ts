import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void { }

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
      .subscribe(() => this.deleteTodo.emit(todo));
  }
}
