import { AuthService } from '../login/auth.service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpensesService {
  private BASE_URL = '/api/expenses';

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getAccessToken() {
    return `?access_token=${this.authService.getAccessToken()}`;
  }

  getAll() {
    return this.http.get(`${this.BASE_URL}${this.getAccessToken()}`)
    .map((res) => res.json());
  }

  create(description, amount) {
    return this.http.post(`${this.BASE_URL}${this.getAccessToken()}`, {
      description,
      amount
    })
    .map((res) => res.json());
  }

  update(id, description, amount) {
    return this.http.put(`${this.BASE_URL}/${id}${this.getAccessToken()}`, {
      description,
      amount
    });
  }
}
