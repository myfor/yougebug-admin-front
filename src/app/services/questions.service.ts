import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServicesBase, Result, Paginator, ROUTER_PREFIX } from './common';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { debounceTime, retry, catchError } from 'rxjs/operators';

export interface QuestionItem {
  id: number;
  title: string;
  description: string;
  createDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private base: ServicesBase,
    private http: HttpClient
  ) { }

    getQuestions(index: number, search = '', size = 20): Observable<Result<Paginator>> {
      const p = new HttpParams();

      if (search) {
        p.append('search', search);
      }
      if (index <= 0) {
        index = 1;
      }
      p.append('index', index.toString())
        .append('size', size.toString());
      const URL = `${ROUTER_PREFIX}/api/questions?${p.toString()}`;
      return this.http.get<Result<Paginator<QuestionItem>>>(URL)
      .pipe(
        debounceTime(500),
        retry(1),
        catchError(this.base.handleError)
      );

    }
}
