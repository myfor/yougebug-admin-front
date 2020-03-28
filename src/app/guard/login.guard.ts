import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Global } from '../global';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private user: UsersService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // if (Global.isLogged()) {
    //   return true;
    // } else {
    //   this.router.navigateByUrl('auth/login');
    //   return false;
    // }
    return this.isLogged();
  }

  isLogged(): Observable<boolean> {
    return new Observable<boolean>((ob) => {
      this.user.isLogged().subscribe(r => {
        if (r.isFault) {
          ob.next(false);
          this.router.navigateByUrl('auth/login');
        } else {
          ob.next(true);
        }
        ob.complete();
      });
    });
  }
}
