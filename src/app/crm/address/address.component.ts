import {
  AfterViewInit,
  Component,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';
import { FieldsMetadata, getEntityRef } from 'remult';
import { Address } from '../../../shared/entities/address';
import { AutofieldComponent } from '../../core/autofield/autofield.component';
import { EditComponent, Penner } from '../../core/edit/edit.component';
import { Customer } from '../../../shared/entities/customer';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [AutofieldComponent, FormsModule, ClrFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() address!: Address;
  fields!: FieldsMetadata<Address>;

   @Input() parent!: EditComponent<Customer>;

  @ViewChild(NgForm) form!: NgForm;

  constructor() {}

  ngOnInit(): void {
    if (this.address) {
      this.fields = getEntityRef(this.address).metadata.fields;
    }
  }

  ngAfterViewInit(): void {
    this.parent.registerFormForValidation(this.form);
  }
  ngOnDestroy(): void {
    this.parent.deregisterFormForValidation(this.form);
  }
}
