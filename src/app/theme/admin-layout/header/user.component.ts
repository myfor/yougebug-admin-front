import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { Global } from '../../../global';

@Component({
  selector: 'app-user',
  template: `
    <a
      mat-button
      class="matero-toolbar-button matero-avatar-button"
      href="javascript:void(0)"
      [matMenuTriggerFor]="menu"
    >
      <img class="matero-avatar" src="assets/images/avatar.png" width="32" alt="avatar" />
      <span class="matero-username" fxHide.lt-sm>{{userName}}</span>
    </a>

    <mat-menu #menu="matMenu">
      <a routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>Profile</span>
      </a>
      <a routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </a>
      <a href="javascript:;" (click)="logout()" mat-menu-item>
        <mat-icon>exit_to_app</mat-icon>
        <span>Logout</span>
      </a>
    </mat-menu>
  `,
})
export class UserComponent {

  userName = Global.userName;

  constructor(
    private router: Router,
    private user: UsersService
  ) {}

  logout() {
    this.user.logout().subscribe(() => {
      Global.loginggOut();
      this.router.navigateByUrl('/auth/login');
    });
  }
}
