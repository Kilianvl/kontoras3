import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { CustomerComponent } from './customer/customer.component';
import { AuthComponent } from './auth/auth.component';
import { CustomerViewComponent } from './customer/customer-view/customer-view.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';

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
  path: 'customers/:customerId',
  canActivate: [authGuard],
  component: CustomerViewComponent,
},
{
  path: 'customers/:customerId/edit',
  canActivate: [authGuard],
  component: CustomerEditComponent,
},
{
  path: 'login',
  component: AuthComponent
}

];
