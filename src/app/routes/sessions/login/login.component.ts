import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService, LoginInfo } from '../../../services/users/users.service';

import { CommonService } from '../../../services/common.service';
import { Global } from '../../../global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UsersService,
    private common: CommonService
  ) {
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    if (this.reactiveForm.invalid) {
      this.common.snackOpen('账号或密码不能位空', 2000);
      return;
    }
    const loginInfo: LoginInfo = {
      account: this.reactiveForm.get('username').value,
      password: this.reactiveForm.get('password').value
    };
    this.user.login(loginInfo).subscribe((result) => {
      if (result.isFault) {
        this.common.snackOpen('登录失败，请重试');
        return;
      }
      Global.setGlobalUserInfo(result.data.userName, result.data.email);
      this.router.navigateByUrl('/');
    });
  }
}
