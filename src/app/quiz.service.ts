import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Quiz } from './quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizzesUrl = 'api/quizzes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getQuizzes(): Observable<Quiz[]> {
    // this.log('fetched quizzes');
    return this.http.get<Quiz[]>(this.quizzesUrl)
      .pipe(
        tap(_ => this.log('fetched quizzes')),
        catchError(this.handleError<Quiz[]>('getQuizzes', []))
      );
  }

  /** GET quiz by id. Will 404 if id not found */
  getQuiz(id: number): Observable<Quiz> {
    const url = `${this.quizzesUrl}/${id}`;
    return this.http.get<Quiz>(url).pipe(
      tap(_ => this.log(`fetched quiz id=${id}`)),
      catchError(this.handleError<Quiz>(`getQuiz id=${id}`))
    );
  }

  /** GET quiz by id. Return `undefined` when id not found */
  getQuizNo404<Data>(id: number): Observable<Quiz> {
    const url = `${this.quizzesUrl}/?id=${id}`;
    return this.http.get<Quiz[]>(url)
      .pipe(
        map(quizzes => quizzes[0]), // returns a {0|1} element array
        tap(q => {
          const outcome = q ? 'fetched' : 'did not find';
          this.log(`${outcome} quiz id=${id}`);
        }),
        catchError(this.handleError<Quiz>(`getQuiz id=${id}`))
      );
  }

  /* GET quizzes whose name contains search term */
  searchQuizzes(term: string): Observable<Quiz[]> {
    if (!term.trim()) {
      // if not search term, return empty quiz array.
      return of([]);
    }
    return this.http.get<Quiz[]>(`${this.quizzesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found quizzes matching "${term}"`) :
        this.log(`no quizzes matching "${term}"`)),
      catchError(this.handleError<Quiz[]>('searchQuizzes', []))
    );
  }

  /** PUT: update the quiz on the server */
  updateQuiz(quiz: Quiz): Observable<any> {
    return this.http.put(this.quizzesUrl, quiz, this.httpOptions).pipe(
      tap(_ => this.log(`updated quiz id=${quiz.id}`)),
      catchError(this.handleError<any>('updateQuiz'))
    );
  }

  /** POST: add a new quiz to the server */
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizzesUrl, quiz, this.httpOptions).pipe(
      tap((newQuiz: Quiz) => this.log(`added quiz w/ id=${newQuiz.id}`)),
      catchError(this.handleError<Quiz>('addQuiz'))
    );
  }

  /** DELETE: delete the quiz from the server */
  deleteQuiz(id: number): Observable<Quiz> {
    const url = `${this.quizzesUrl}/${id}`;

    return this.http.delete<Quiz>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted quiz id=${id}`)),
      catchError(this.handleError<Quiz>('deleteQuiz'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a QuizService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QuizService: ${message}`);
  }
}
