import { Component, Input, OnInit } from '@angular/core';

import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  ClarityModule,
  ClrCheckboxModule,
  ClrComboboxModule,
  ClrFormsModule,
} from '@clr/angular';
import { Repository } from 'remult';
import { idType } from 'remult/src/remult3/remult3';
import { Base } from '../../../shared/entities/base';
import { AutofieldComponent } from '../autofield/autofield.component';

@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export abstract class EditComponent<TEntity extends Base> implements OnInit {
  entity?: TEntity;

  @Input() id!: idType<TEntity>;
  abstract repo: Repository<TEntity>;
  fields: any;

  constructor(private router: Router) {}

  async ngOnInit() {
    this.fields = this.repo.metadata.fields;

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
