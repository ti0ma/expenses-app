import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  private BASE_URL = '/oauth/token';
  private STORAGE_API_KEY = 'expensese_access_token';
  data;
  statusRequest;

  constructor(
    private http: Http,
    private router: Router
  ) {}

  isLoggedIn() {
    return this.http.get(`/api/status?access_token=${this.getAccessToken()}`);
  }

  getAccessToken() {
    return localStorage.getItem(this.STORAGE_API_KEY);
  }

  login(email, password) {
    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa('client:secret')}`);

    return this.http
      .post(`${this.BASE_URL}?grant_type=password&username=${email}&password=${password}`, {}, { headers })
      .map((res) => res.json())
      .map((res) => {
        const accessToken = res['access_token'];
        if (accessToken) {
          localStorage.setItem(this.STORAGE_API_KEY, accessToken);
        }
        return res;
      });
  }

  logout() {
    localStorage.removeItem(this.STORAGE_API_KEY);
    this.router.navigate(['/login']);
  }
}
