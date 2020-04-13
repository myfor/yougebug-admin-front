import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeyValue } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

//  路由前缀
export const ROUTER_PREFIX = '/admin';

/**
 * 服务器响应模型
 */
export interface Result<T = any> {
    message: string;
    data: T;
    /**
     * 是否为失败请求, 在拦截器中设置
     */
    isFault: boolean;
}

/**
 * 请求失败, 可以和 Result 的 data 对比
 */
export const FAULT: undefined = undefined;

/**
 * 分页模型
 */
export interface Paginator<T = any> {
    index: number;
    size: number;
    totalPages: number;
    totalRows: number;
    list: T[];
}
//  基本服务
@Injectable({
    providedIn: 'root'
})
export class ServicesBase {
    handleError(error: HttpErrorResponse) {
        const result: Result = {
          message: '请求失败, 稍后重试',
          data: FAULT,
          isFault: true
        };
        switch (error.status) {
            case 401: {
                result.message = '请先登录';
                return of(result);
            }
            default: break;
        }
        console.error(`backend returned code ${error.status}`);
        console.error(`error: ${error.error}`);
        return of(result);
    }
}

//  通用服务
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private snack: MatSnackBar
  ) { }

  snackOpen(message: string, duration?: number) {
    if (!duration) {
      duration = null;
    }

    this.snack.open(message, '关闭', {
      duration,
    });
  }
}
//  基本状态
export class State {
  //  状态，禁用
  static disabled: KeyValue<number, string> = {
    key: 0,
    value: '禁用'
  };
  //  状态，启用
  static enabled: KeyValue<number, string> = {
    key: 1,
    value: '启用'
  };
  //  状态，移除
  static remove: KeyValue<number, string> = {
    key: 2,
    value: '移除'
  };
  //  状态，待审核
  static toAudit: KeyValue<number, string> = {
    key: 3,
    value: '待审核'
  };
}
