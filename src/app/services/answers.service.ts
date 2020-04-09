import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServicesBase, Result, Paginator, ROUTER_PREFIX } from './common';
import { Observable } from 'rxjs';
import { debounceTime, retry, catchError } from 'rxjs/operators';
import { KeyValue } from '@angular/common';
import { State } from './common.service';

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

export interface AnswerItemAll {
  id: number;
  questionTitle: string;
  content: string;
  votes: number;
  createDate: string;
  answererName: string;
  state: KeyValue<number, string>;
}

export interface AnswerDetail {
  questionTitle: string;
  questionContent: string;
  questionAsker: string;
  answerContent: string;
  answererName: string;
  answererAvatar: string;
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

  //  获取所有答案列表
  getAllAnswers(index: number, row: number, state: string, questionTitle: string): Observable<Result<Paginator<AnswerItemAll>>> {
    questionTitle = questionTitle.trim();

    const P: HttpParams = new HttpParams()
    .append('index', index.toString())
    .append('size', row.toString())
    .append('state', state)
    .append('questionTitle', questionTitle ? questionTitle : '');

    const URL = `${ROUTER_PREFIX}/api/answers/all?${P.toString()}`;
    return this.http.get<Result>(URL)
      .pipe(
        debounceTime(500),
        retry(1),
        catchError(this.base.handleError)
      );
  }

  //  获取详情
  getAnswerDetail(id: number): Observable<Result<AnswerDetail>> {
    const URL = `${ROUTER_PREFIX}/api/answers/${id}`;
    return this.http.get<Result<AnswerDetail>>(URL)
      .pipe(
        debounceTime(500),
        retry(1),
        catchError(this.base.handleError)
      );
  }

  get emptyAnswerDetail(): AnswerDetail {
    const DETAIL: AnswerDetail = {
      questionTitle: '',
      questionContent: '',
      questionAsker: '',
      answerContent: '',
      answererName: '',
      answererAvatar: ''
    };
    return DETAIL;
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
    const URL = `${ROUTER_PREFIX}/api/answers/${id}/disabled?description=${description}`;
    return this.http.patch<Result>(URL, '')
    .pipe(
      debounceTime(500),
      retry(1),
      catchError(this.base.handleError)
    );
  }
}
