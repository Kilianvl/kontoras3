import { Component, OnInit } from '@angular/core';
import { remult } from 'remult';
import { Customer } from '../../shared/entities/customer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrComboboxModule, ClrDatagridModule, ClrDatagridSortOrder } from "@clr/angular";
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule,ClarityModule, ClrComboboxModule,ClrDatagridModule,RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  customerRepo = remult.repo(Customer);
  customers: Customer[] = [];

  sortOrder: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC;
  constructor(private router: Router) {} // Initialize the 'router' variable

  ngOnInit() {
    this.customerRepo.find().then((items) => (this.customers = items));

  }

    states = [{name: 'NY'}, {name: 'NJ'}, {name: 'CT'}, {name: 'PA'}, {name: 'DE'}];
  selection = [];


  copyCustomerId(id: string) {
    navigator.clipboard.writeText(id);

  }

  openCustomer(id:string) {
    this.router.navigateByUrl('/customers/' + id); // Use 'this.router' to navigate
  }
}


