import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicesBase, Paginator, Result, ROUTER_PREFIX } from '../common';
import { Observable } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';

//  客户列表单项
export class ClientItem {
  id: number;
  userName: string;
  email: string;
  createDate: string;
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
    if (!search) {
      search = '';
    }
    if (index <= 0) {
      index = 1;
    }
    const URL = `${ROUTER_PREFIX}`;
    return this.http.get<Result<Paginator<ClientItem>>>(URL)
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError)
    );
  }
}
