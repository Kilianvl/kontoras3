import { Component, Input } from '@angular/core';
import { Customer } from '../../../shared/entities/customer';
import { Address } from '../../../shared/entities/address';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrAlertModule } from '@clr/angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-view',
  standalone: true,
  imports: [CommonModule, ClarityModule, ClrAlertModule],
  templateUrl: './address-view.component.html',
  styleUrl: './address-view.component.scss',
})
export class AddressViewComponent {
  @Input()
  address!: Address;
  @Input()
  entity!: Customer;

  constructor(private toastr: ToastrService) {}

  async copy() {
    console.log('copying address to clipboard');
    const addressText = `${this.entity.displayName}\n${this.address.street}\n${this.address.zip} ${this.address.city}\n${this.address.country} `;
    try {
      await navigator.clipboard.writeText(addressText);
      this.toastr.success('Adresse in die Zwischenablage kopiert!');
    } catch (error) {
      this.toastr.success(
        'Fehler beim Kopieren der Adresse in die Zwischenablage!'
      );
    }
  }
}
