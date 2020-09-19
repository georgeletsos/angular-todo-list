import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.css']
})
export class TodoSearchComponent implements OnInit {
  todos$: Observable<Todo[]>;
  private searchTerms = new Subject<string>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.todoService.searchTodos(term)),
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
