import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo: Todo;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTodo();
  }

  goBack(): void {
    this.location.back();
  }

  getTodo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService
      .getTodo(id)
      .subscribe(todo => this.todo = todo);
  }

  save(): void {
    this.todoService
      .updateTodo(this.todo)
      .subscribe(() => this.goBack());
  }
}
