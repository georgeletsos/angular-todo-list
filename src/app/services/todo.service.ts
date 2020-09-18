import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Todo } from '../models/todo.model';
import { TODOS } from '../mock-todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'api/todos';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.todosUrl)
      .pipe(
        tap(_ => console.log('SUCCESSFULLY FETCHED TODOS')),
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
  }

  getTodo(id: number): Observable<Todo> {
    return this.http
      .get<Todo>(this.todosUrl + `/${id}`)
      .pipe(
        tap(_ => console.log(`SUCCESSFULLY FETCHED TODO WITH ID = ${id}`)),
        catchError(this.handleError<Todo>(`getTodo(id = ${id})`))
      );
  }

  updateTodo(todo: Todo): Observable<any> {
    const id = todo.id;
    return this.http
      .put(this.todosUrl + `/${id}`, todo, this.httpOptions)
      .pipe(
        tap(_ => console.log(`SUCCESSFULLY UPDATED TODO WITH ID = ${id}`)),
        catchError(this.handleError<Todo>(`updateTodo(id = ${id})`))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      alert(`Operation ${operation} failed: ${error.body.error}.`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
