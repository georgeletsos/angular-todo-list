import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Todo } from '../models/todo.model';
import { TODOS } from '../mock-todos';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): { todos: Todo[] } {
    return { todos: TODOS };
  }

  /** 
   * Overrides the genId method to ensure that a todo always has an id.
   * If the todos array is empty, the method below returns the initial number (1).
   * If the todos array is not empty, the method below returns the highest hero id + 1.
   */
  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(hero => hero.id)) + 1 : 1;
  }
}
