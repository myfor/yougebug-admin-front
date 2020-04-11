import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServicesBase, Result, Paginator, ROUTER_PREFIX } from './common';
import { Observable } from 'rxjs';
import { debounceTime, retry, catchError } from 'rxjs/operators';
import { KeyValue } from '@angular/common';
import { AnswerItem } from './answers.service';

//  被举报的提问列表单项
export interface ReportQuestionItem {
  questionId: number;
  title: string;
  reportCount: number;
  state: KeyValue<number, string>;
}

export interface QuestionItem {
  id: number;
  title: string;
  description: string;
  state: KeyValue<number, string>;
  createDate: string;
  answersCount: number;
}

export interface QuestionDetail {
  title: string;
  description: string;
  state: KeyValue<number, string>;
  createDate: string;
  tags: string[];
  votes: number;
  views: number;
  user: UserInfo;
  page: Paginator<AnswerItem>;
}

export interface UserInfo {
  id: number;
  account: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private base: ServicesBase,
    private http: HttpClient
  ) { }

  getReportQuestion(index: number, title: string): Observable<Result<Paginator<ReportQuestionItem>>> {
    title = title;
    let p = new HttpParams();
    if (index <= 0) {
      index = 1;
    }
    p = p.append('index', index.toString());
    if (title) {
      p = p.append('title', title);
    }
    const URL = `${ROUTER_PREFIX}/api/questions/reports?${p.toString()}`;
    return this.http.get<Result<Paginator<ReportQuestionItem>>>(URL)
    .pipe(
      debounceTime(1000),
      retry(1),
      catchError(this.base.handleError)
    );
  }

  getQuestions(index: number, search = '', state: string, size = 20): Observable<Result<Paginator>> {
    let p = new HttpParams();
    if (search) {
      p = p.append('search', search);
    }
    if (state) {
      p = p.append('state', state);
    }
    if (index <= 0) {
      index = 1;
    }
    p = p.append('index', index.toString())
        .append('size', size.toString());
    const URL = `${ROUTER_PREFIX}/api/questions?${p.toString()}`;
    //  console.log(URL);
    return this.http.get<Result<Paginator<QuestionItem>>>(URL)
    .pipe(
      debounceTime(1000),
      retry(1),
      catchError(this.base.handleError)
    );
  }
  //  获取提问详情
  getQuestion(id: number): Observable<Result<QuestionDetail>> {
    const URL = `${ROUTER_PREFIX}/api/questions/${id}`;
    return this.http.get<Result>(URL)
    .pipe(
      debounceTime(500),
      retry(1),
      catchError(this.base.handleError)
    );
  }

  deleteQuestion(id: number): Observable<Result> {
    const URL = `${ROUTER_PREFIX}/api/questions/${id}`;
    return this.http.delete<Result>(URL)
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError)
    );
  }
    //  启用提问
  enabledQuestion(id: number): Observable<Result> {
    const URL = `${ROUTER_PREFIX}/api/questions/${id}/enabled`;
    return this.http.patch<Result>(URL, '')
    .pipe(
      debounceTime(500),
      retry(1),
      catchError(this.base.handleError)
    );
  }

  //  禁用提问
  disabledQuestion(id: number) {
    const URL = `${ROUTER_PREFIX}/api/questions/${id}/back?descpiption=`;
    return this.http.patch<Result>(URL, '')
    .pipe(
      debounceTime(500),
      retry(1),
      catchError(this.base.handleError)
    );
  }
}
