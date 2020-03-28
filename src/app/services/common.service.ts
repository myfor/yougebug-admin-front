import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  //  状态，禁用
  disabledState: KeyValue<number, string> = {
    key: 0,
    value: '禁用'
  };
  //  状态，启用
  enabledState: KeyValue<number, string> = {
    key: 1,
    value: '启用'
  };
  //  状态，移除
  removeState: KeyValue<number, string> = {
    key: 2,
    value: '移除'
  };

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
