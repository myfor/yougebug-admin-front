import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeyValue } from '@angular/common';

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
