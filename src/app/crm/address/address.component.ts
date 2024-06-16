import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Address } from '../../../shared/entities/address';
import { FieldsMetadata, getEntityRef } from 'remult';
import { AutofieldComponent } from '../../core/autofield/autofield.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [AutofieldComponent, FormsModule, ClrFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit,OnDestroy, AfterViewInit  {


  @Input() address!: Address;
  fields!: FieldsMetadata<Address>;

@ViewChild(NgForm) form!: NgForm;


@Output() formCreated: EventEmitter<NgForm> = new EventEmitter<NgForm>();
@Output() formDestroyed: EventEmitter<NgForm> = new EventEmitter<NgForm>();

  ngOnInit(): void {
    if (this.address) {
      this.fields = getEntityRef(this.address).metadata.fields;
    }
  }

  ngAfterViewInit(): void {
    this.formCreated.emit(this.form);
  }
  ngOnDestroy(): void {
    this.formDestroyed.emit(this.form);
  }
}
