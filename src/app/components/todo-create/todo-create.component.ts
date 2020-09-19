import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {

  constructor(
    private titleService: Title,
    private todoService: TodoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Todo Create | AngularTodoList');
  }

  goBack(): void {
    this.location.back();
  }

  create(title: string, completed: boolean): void {
    title = title.trim();
    if (!title) {
      return;
    }

    // TODO: handle the error
    this.todoService
      .createTodo({ title, completed } as Todo)
      .subscribe(() => this.goBack());
  }
}
