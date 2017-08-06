import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';


export const routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'expenses'
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'expenses',
  component: ExpensesListComponent,
  canActivate: [AuthGuard]
}];
