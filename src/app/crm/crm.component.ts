import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClarityModule, ClrComboboxModule, ClrDatagridModule, ClrDatagridSortOrder } from "@clr/angular";
import { remult } from 'remult';
import { Customer } from '../../shared/entities/customer';
import { Person } from '../../shared/entities/person';
import { Company } from '../../shared/entities/company';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [CommonModule, FormsModule,ClarityModule, ClrComboboxModule,ClrDatagridModule,RouterLink],
  templateUrl: './crm.component.html',
  styleUrl: './crm.component.scss',
})
export class CrmComponent implements OnInit {
  personRepo = remult.repo(Person);
  companyRepo = remult.repo(Company);
  customers: Customer[] = [];

  sortOrder: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC;
  constructor(private router: Router) {} // Initialize the 'router' variable

  async ngOnInit() {
   const persons = await this.personRepo.find();
   const companies = await this.companyRepo.find();
   this.customers = [...persons, ...companies];

  }

  copyCustomerId(id: string) {
    navigator.clipboard.writeText(id);

  }

  openCustomer(entity: Customer) {
    console.log(entity.customerType)
    switch(entity.customerType) {
      case 'Person':
        this.router.navigateByUrl('/crm/person/' + entity.id); // Use 'this.router' to navigate
        break;
      case 'Company':
        this.router.navigateByUrl('/crm/company/' + entity.id); // Use 'this.router' to navigate
        break;
      default:
        return;
    }
  }
}


