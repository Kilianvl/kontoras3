import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../../shared/entities/address';
import { FieldsMetadata, getEntityRef } from 'remult';
import { AutofieldComponent } from '../../core/autofield/autofield.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [AutofieldComponent, FormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  @Input() address!: Address;
  fields!: FieldsMetadata<Address>;

  ngOnInit(): void {
    if (this.address) {
      this.fields = getEntityRef(this.address).metadata.fields;
    }
  }
}
