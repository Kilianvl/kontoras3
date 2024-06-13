import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Person } from '../../../shared/entities/person';
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
  selector: 'app-person-edit',
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
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss',
})
export class PersonEditComponent implements OnInit {
  @Input() id!: string;

  repo = remult.repo(Person);
  fields = this.repo.metadata.fields;
  entity?: Person;

  @ViewChild('')
  form?: NgForm;

  constructor(private router: Router) {} // Initialize the Router module

  async ngOnInit() {
    if (this.id == 'new') {
      console.log('Creating new person');
      this.entity = await this.repo.create();
    } else {
      this.entity = await this.repo.findId(this.id);
    }
  }

  async saveChanges() {
    if (this.entity) {
      this.entity = await this.repo.save(this.entity);
      this.router.navigate(['/crm/person/', this.entity.id]); // Use 'this.router' instead of 'router'
    }
  }


}
