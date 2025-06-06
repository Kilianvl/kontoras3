import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './auth/auth.guard';
import { CrmComponent } from './crm/crm.component';
import { PersonEditComponent } from './crm/person-edit/person-edit.component';
import { PersonViewComponent } from './crm/person-view/person-view.component';
import { CompanyViewComponent } from './crm/company-view/company-view.component';
import { CompanyEditComponent } from './crm/company-edit/company-edit.component';
import { NumberRangesComponent } from './settings/number-ranges.component';
import { OmComponent } from './om/om.component';
import { InvoiceEditComponent } from './om/invoice-edit/invoice-edit.component';
import { InvoiceViewComponent } from './om/invoice-view/invoice-view.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'crm/overview',
    pathMatch: 'full',
  },
  {
    path: 'crm/overview',
    canActivate: [authGuard],
    component: CrmComponent,
  },
  {
    path: 'crm/person/:id',
    canActivate: [authGuard],
    component: PersonViewComponent,
  },
  {
    path: 'crm/person/:id/edit',
    canActivate: [authGuard],
    component: PersonEditComponent,
  },
  {
    path: 'crm/company/:id',
    canActivate: [authGuard],
    component: CompanyViewComponent,
  },
  {
    path: 'crm/company/:id/edit',
    canActivate: [authGuard],
    component: CompanyEditComponent,
  },

  {
    path: 'om/invoice',
    canActivate: [authGuard],
    component: OmComponent,
  },
  {
    path: 'om/invoice/:id',
    canActivate: [authGuard],
    component: InvoiceViewComponent,
  },
  {
    path: 'om/invoice/:id/edit',
    canActivate: [authGuard],
    component: InvoiceEditComponent,
  },

  {
    path: 'settings/number-ranges',
    canActivate: [authGuard],
    component: NumberRangesComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
];
