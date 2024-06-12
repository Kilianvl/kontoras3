import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../../shared/entities/customer';
import { remult } from 'remult';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Import the Router module

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ClrFormsModule, ClarityModule, JsonPipe,RouterLink],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss',
})
export class CustomerEditComponent implements OnInit {

  @Input() customerId!: string;

  customerRepo = remult.repo(Customer);
  customer?: Customer;

  constructor(private router: Router) {} // Initialize the Router module

  async ngOnInit() {
    if(this.customerId == 'new') {
      console.log('Creating new customer');
      this.customer = await this.customerRepo.create();
    } else {
      this.customer = await this.customerRepo.findId(this.customerId);
    }
  }

  async saveChanges() {
    if(this.customer) {
    this.customer = await this.customerRepo.save(this.customer);
    this.router.navigate(['customers/',this.customer.id]); // Use 'this.router' instead of 'router'
    }
  }
}
