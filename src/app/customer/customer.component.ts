import { Component, OnInit } from '@angular/core';
import { remult } from 'remult';
import { Customer } from '../../shared/entities/customer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrComboboxModule } from "@clr/angular";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule,ClarityModule, ClrComboboxModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  customerRepo = remult.repo(Customer);
  customers: Customer[] = [];

  ngOnInit() {
    this.customerRepo.find().then((items) => (this.customers = items));
  }

    states = [{name: 'NY'}, {name: 'NJ'}, {name: 'CT'}, {name: 'PA'}, {name: 'DE'}];
  selection = [];
}
