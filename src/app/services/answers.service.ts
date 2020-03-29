import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServicesBase, Result, Paginator, ROUTER_PREFIX } from './common';
import { Observable } from 'rxjs';
import { debounceTime, retry, catchError } from 'rxjs/operators';
import { KeyValue } from '@angular/common';

export interface AnswerItem {
  id: number;
  votes: number;
  content: string;
  createDate: string;
  userId: number;
  userName: string;
  avatar: string;
  state: KeyValue<number, string>;
}

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(
    private base: ServicesBase,
    private http: HttpClient
  ) { }

  getAnswers(questionId: number, index: number, row: number): Observable<Result<Paginator<AnswerItem>>> {
    const P: HttpParams = new HttpParams()
    .append('questionId', questionId.toString())
    .append('index', index.toString())
    .append('size', row.toString());

    const URL = `${ROUTER_PREFIX}/api/answers?${P.toString()}`;
    return this.http.get<Result<Paginator>>(URL)
    .pipe(
      debounceTime(500),
      retry(1),
      catchError(this.base.handleError)
    );
  }

  enabled(id: number): Observable<Result> {
    const URL = `${ROUTER_PREFIX}/api/answers/${id}/enabled`;
    return this.http.patch<Result>(URL, '')
    .pipe(
      debounceTime(500),
      retry(1),
      catchError(this.base.handleError)
    );
  }

  disabled(id: number, description: string): Observable<Result> {
    const URL = `${ROUTER_PREFIX}/api/answers/${id}/disabled`;
    return this.http.patch<Result>(URL, '')
    .pipe(
      debounceTime(500),
      retry(1),
      catchError(this.base.handleError)
    );
  }
}
