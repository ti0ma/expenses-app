import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn()
      .map((res) => {
        // If returns 200, its signed in
        return true;
      })
      .catch(() => {
        this.router.navigate(['/login']);
        return Observable.of(false);
      });
  }
}
