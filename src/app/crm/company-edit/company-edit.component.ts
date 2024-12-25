import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  ClarityModule,
  ClrCheckboxModule,
  ClrComboboxModule,
  ClrFormsModule,
  ClrTabsModule,
} from '@clr/angular';
import { TranslateModule } from '@ngx-translate/core'; // Import the TranslateModule
import { remult } from 'remult';
import { Company } from '../../../shared/entities/company';
import { AutofieldComponent } from '../../core/autofield/autofield.component';
import { EditComponent } from '../../core/edit/edit.component';
import { AddressEditComponent } from '../address/address-edit.component';
import { Address } from '../../../shared/entities/address';

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
    ClrTabsModule,
    JsonPipe,
    RouterLink,
    AddressEditComponent,
    TranslateModule, // Add TranslateModule to imports
  ],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent extends EditComponent<Company> {
  override repo = remult.repo(Company);

  previewCustomerNumber: string = '';

  override rootPath = '/crm/company/';
  constructor(router: Router) {
    super(router);
  }
  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    if (this.entity?.addresses?.length == 0) {
      await this.createRelationItem('addresses');
    }
    this.repo.relations(this.entity!); // Fix the missing closing parenthesis
    this.previewCustomerNumber = await this.entity!.previewCustomerNumber();
  }
}
