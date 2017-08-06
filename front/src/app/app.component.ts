import { AuthService } from './login/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLogout = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .subscribe((location) => {
      if (location['url'] !== '/login') {
        this.showLogout = true;
        return;
      }
      this.showLogout = false;
    });
  }

  logout() {
    this.authService.logout();
  }
}
