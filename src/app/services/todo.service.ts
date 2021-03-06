import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Todo } from '../models/todo.model';
import { Alert, AlertType } from '../models/alert.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'api/todos';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

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

  createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(this.todosUrl, todo, this.httpOptions)
      .pipe(
        tap(_ => this.pushAlert(AlertType.Success, 'Successfully created new todo!')),
        catchError(this.handleError<Todo>(`createTodo`))
      );
  }

  updateTodo(todo: Todo): Observable<any> {
    const id = todo.id;
    return this.http
      .put(this.todosUrl + `/${id}`, todo, this.httpOptions)
      .pipe(
        tap(_ => this.pushAlert(AlertType.Success, 'Successfully updated todo!')),
        catchError(this.handleError<Todo>(`updateTodo(id = ${id})`))
      );
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const id = todo.id;
    return this.http
      .delete<Todo>(this.todosUrl + `/${id}`, this.httpOptions)
      .pipe(
        tap(_ => this.pushAlert(AlertType.Success, 'Successfully deleted todo!')),
        catchError(this.handleError<Todo>(`deleteTodo(id = ${id})`))
      );
  }

  searchTodos(term: string): Observable<Todo[]> {
    term = term.trim();
    if (!term) {
      return of([]);
    }

    return this.http
      .get<Todo[]>(this.todosUrl + `/?title=${term}`)
      .pipe(
        tap(x => x.length ?
          console.log(`FOUND ${x.length} TODOS WITH TITLE CONTAINING ${term}`) :
          console.log(`NO TODOS MATCHING WITH TITLE CONTAINING ${term}`)
        ),
        catchError(this.handleError<Todo[]>(`searchTodos(title CONTAINS ${term})`, []))
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
      this.pushAlert(AlertType.Error, 'Something went wrong on our side...');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private pushAlert(type: AlertType, message: string): void {
    this.alertService.pushAlert({ id: 0, type, message });
  }
}
