import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { ServicesBase, Result, ROUTER_PREFIX } from '../common';
import { debounceTime, catchError, retry } from 'rxjs/operators';

import sha256 from 'crypto-js/sha256';

//  登录需要的信息
export interface LoginInfo {
  account: string;
  password: string;
}
//  登录后返回的用户信息
export interface UserInfo {
  userName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private base: ServicesBase
  ) { }

  /*
  登录
  */
  login(loginInfo: LoginInfo): Observable<Result<UserInfo>> {
    loginInfo.password = sha256(loginInfo.password).toString();

    const URL = `${ROUTER_PREFIX}/api/login`;
    return this.http.patch<Result<UserInfo>>(URL, loginInfo)
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError)
    );
  }
  //  登出
  logout(): Observable<Result> {
    const URL = `${ROUTER_PREFIX}/api/logout`;
    return this.http.patch<Result>(URL, '')
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError)
    );
  }

  //  当前用户是否登录
  isLogged(): Observable<Result> {
    const URL = `${ROUTER_PREFIX}/api/accounts/islogged`;
    return this.http.get<Result>(URL)
    .pipe(
      retry(1),
      catchError(this.base.handleError)
    );
  }
}
