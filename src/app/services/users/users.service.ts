import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { ServicesBase, Result, ROUTER_RPEFIX } from '../common';
import { debounceTime, catchError } from 'rxjs/operators';

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

    const URL = `${ROUTER_RPEFIX}/api/login`;
    return this.http.patch<Result<UserInfo>>(URL, loginInfo)
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError)
    );
  }
  //  登出
  logout(): Observable<Result> {
    const URL = `${ROUTER_RPEFIX}/api/logout`;
    return this.http.patch<Result>(URL, '')
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError)
    );
  }
}
