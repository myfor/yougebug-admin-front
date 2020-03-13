import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServicesBase, Paginator, Result, ROUTER_PREFIX } from '../common';
import { Observable } from 'rxjs';
import { catchError, debounceTime, retry } from 'rxjs/operators';

//  客户列表单项
export class ClientItem {
  id: number;
  userName: string;
  email: string;
  createDate: string;
  state: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private base: ServicesBase,
    private http: HttpClient
  ) { }

  //  获取客户列表
  getClients(index: number, size = 20, search = ''): Observable<Result<Paginator<ClientItem>>> {
    const p = new HttpParams();

    if (search) {
      p.append('search', search);
    }
    if (index <= 0) {
      index = 1;
    }
    p.append('index', index.toString())
      .append('size', size.toString());

    const URL = `${ROUTER_PREFIX}/api/clients?${p.toString()}`;
    return this.http.get<Result<Paginator<ClientItem>>>(URL)
    .pipe(
      debounceTime(500),
      retry(1),
      catchError(this.base.handleError)
    );
  }
}
