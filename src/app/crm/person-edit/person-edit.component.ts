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
import { EditComponent } from '../../core/edit/edit.component';

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
export class PersonEditComponent extends EditComponent<Person> {
  repo = remult.repo(Person);

  constructor(router: Router) {
    super(router);
  }
}
