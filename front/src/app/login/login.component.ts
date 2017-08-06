import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  serverError = false;
  invalidError = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    this.serverError = false;
    if (!this.form.valid) {
      this.invalidError = true;
      return;
    }
    this.invalidError = false;
    const { email, password } = this.form.value;
    this.auth.login(email, password)
      .subscribe((res) => {
        this.router.navigate(['/expenses']);
      }, () => {
        this.serverError = true;
      });
  }
}
