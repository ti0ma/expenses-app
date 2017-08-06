import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExpensesService } from './expenses-list/expenses.service';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { ExpensesItemComponent } from './expenses-list/expenses-item/expenses-item.component';
import { ExpensesFormComponent } from './expenses-list/expenses-form/expenses-form.component';
import { AuthGuard } from './login/auth.guard';
import { AuthService } from './login/auth.service';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExpensesListComponent,
    ExpensesItemComponent,
    ExpensesFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ExpensesService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
