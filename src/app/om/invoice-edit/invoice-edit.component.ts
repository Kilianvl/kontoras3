import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  ClarityModule,
  ClrButtonGroup,
  ClrButtonGroupModule,
  ClrCheckboxModule,
  ClrComboboxModule,
  ClrFormsModule,
  ClrTabsModule,
} from '@clr/angular';
import { TranslateModule } from '@ngx-translate/core'; // Import TranslateModule
import { remult } from 'remult';
import { Invoice } from '../../../shared/entities/invoice';
import { AutofieldComponent } from '../../core/autofield/autofield.component';
import { EditComponent } from '../../core/edit/edit.component';
import { InvoiceItemEditComponent } from '../invoice-item/invoice-item-edit.component';

@Component({
  selector: 'app-invoice-editor',
  imports: [
    CommonModule,
    FormsModule,
    ClrFormsModule,
    ClarityModule,
    ClrCheckboxModule,
    ClrComboboxModule,
    AutofieldComponent,
    RouterLink,
    ClrTabsModule,
    ClrButtonGroupModule,
    InvoiceItemEditComponent,
    TranslateModule, // Add TranslateModule to imports
  ],
  templateUrl: './invoice-edit.component.html',
  styleUrl: './invoice-edit.component.scss',
})
export class InvoiceEditComponent extends EditComponent<Invoice> {
  repo = remult.repo(Invoice);
  override rootPath = '/om/invoice/';

  previewInvoiceNumber: string = '';

  constructor(router: Router) {
    super(router);
    this.returnWithEntityId = false;
  }

  setVatType(vatType: 'Netto' | 'Brutto') {
    this.entity!.vatType = vatType;
  }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    if (this.entity?.items?.length == 0) {
      await this.createRelationItem('items');
    }
    this.repo.relations(this.entity!);
    this.previewInvoiceNumber = await this.entity!.previewInvoiceNumber();
  }
}
