import { Component, Input, OnInit } from '@angular/core';
import { remult } from 'remult';
import { Customer } from '../../../shared/entities/customer';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { Router, RouterLink, RouterModule } from '@angular/router'; // Import the Router module

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    JsonPipe,
    RouterLink,
  ],
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.scss',
})
export class CustomerViewComponent implements OnInit {
  showConfirmDeleteModal = false;

  @Input() customerId!: string;
  customerRepo = remult.repo(Customer);
  customer?: Customer;

  constructor(private router: Router) {} // Add the router to the constructor

  async ngOnInit() {
    this.customer = await this.customerRepo.findId(this.customerId);
  }

  confirmDelete() {
    this.showConfirmDeleteModal = true;
  }

  async deleteCustomer() {
    this.showConfirmDeleteModal = false;
    await this.customerRepo.delete(this.customerId);
    this.router.navigate(['customers/overview']); // Use 'this.router' to navigate
  }
}
