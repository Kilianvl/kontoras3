import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { CustomerComponent } from './customer/customer.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [

{
  path: '',
  redirectTo: 'customers/overview',
  pathMatch: 'full'
},
{
  path: 'customers/overview',
  canActivate: [authGuard],
  component: CustomerComponent,
},
{
  path: 'login',
  component: AuthComponent
}

];
