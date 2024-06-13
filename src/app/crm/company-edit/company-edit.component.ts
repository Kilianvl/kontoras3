import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
export class CompanyEditComponent implements OnInit {

  repo = remult.repo(Company);
  fields = this.repo.metadata.fields;
  entity?: Company;

  @Input() id!: string;

  @ViewChild('')
  form?: NgForm;

  constructor(private router: Router) {} // Initialize the Router module

  async ngOnInit() {
    if (this.id == 'new') {
      console.log('Creating new company');
      this.entity = await this.repo.create();
    } else {
      this.entity = await this.repo.findId(this.id);
    }
  }

  async saveChanges() {
    if (this.entity) {
      this.entity = await this.repo.save(this.entity);
      this.router.navigate(['/crm/company/', this.entity.id]); // Use 'this.router' instead of 'router'
    }
  }
}

