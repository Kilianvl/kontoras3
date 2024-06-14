import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Import the Router module
import {
  ClarityModule,
  ClrCheckboxModule,
  ClrComboboxModule,
  ClrFormsModule,
} from '@clr/angular';
import { remult } from 'remult';
import { Company } from '../../../shared/entities/company';
import { AutofieldComponent } from '../../core/autofield/autofield.component';
import { EditComponent } from '../../core/edit/edit.component';

@Component({
  selector: 'app-company-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ClrFormsModule,
    ClarityModule,
    ClrCheckboxModule,
    ClrComboboxModule,
    AutofieldComponent,
    JsonPipe,
    RouterLink,
  ],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent extends EditComponent<Company> {
  override repo = remult.repo(Company);

  constructor(router: Router) {
    super(router);
  }
}

