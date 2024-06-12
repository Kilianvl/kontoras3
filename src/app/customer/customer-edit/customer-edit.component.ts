import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../../../shared/entities/customer';
import { remult, getValueList, FieldMetadata, FieldValidator } from 'remult';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ClarityModule,
  ClrCheckboxModule,
  ClrComboboxModule,
  ClrFormsModule,
} from '@clr/angular';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Import the Router module
import { AutofieldComponent } from '../../core/autofield/autofield.component';

@Component({
  selector: 'app-customer-edit',
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
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss',
})
export class CustomerEditComponent implements OnInit {
  @Input() customerId!: string;

  customerRepo = remult.repo(Customer);
  fields = this.customerRepo.metadata.fields;
  customer?: Customer;

  @ViewChild('')
  form?: NgForm;

  constructor(private router: Router) {} // Initialize the Router module

  async ngOnInit() {
    if (this.customerId == 'new') {
      console.log('Creating new customer');
      this.customer = await this.customerRepo.create();
    } else {
      this.customer = await this.customerRepo.findId(this.customerId);
    }
    console.log(this.customerRepo.metadata.fields);
    console.log(getValueList(this.customerRepo.metadata.fields.salutation!));
  }

  async saveChanges() {
    if (this.customer) {
      this.customer = await this.customerRepo.save(this.customer);
      this.router.navigate(['customers/', this.customer.id]); // Use 'this.router' instead of 'router'
    }
  }


}
