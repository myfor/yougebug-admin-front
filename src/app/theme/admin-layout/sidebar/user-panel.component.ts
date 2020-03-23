import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { UsersService } from '../../../services/users/users.service';
import { Global } from '../../../global';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" fxLayout="column" fxLayoutAlign="center center">
      <img
        class="matero-user-panel-avatar"
        src="assets/images/avatar.png"
        alt="avatar"
        width="64"
      />
      <h4 class="matero-user-panel-name">{{userName}}</h4>
      <h5 class="matero-user-panel-email">{{email}}</h5>
      <div class="matero-user-panel-icons">
        <a routerLink="/profile/overview" mat-icon-button>
          <mat-icon>account_circle</mat-icon>
        </a>
        <a routerLink="/profile/settings" mat-icon-button>
          <mat-icon>settings</mat-icon>
        </a>
        <a href="javascript:;" (click)="logout()" mat-icon-button>
          <mat-icon>exit_to_app</mat-icon>
        </a>
      </div>
    </div>
  `,
})
export class UserPanelComponent {

  userName = Global.userName;
  email = Global.email;

  constructor(
    private router: Router,
    private user: UsersService
  ) {}

  logout() {
    this.user.logout().subscribe(() => {
      Global.loggout();
      this.router.navigateByUrl('/auth/login');
    });
  }
}
