import { Component } from '@angular/core';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [ClrDropdownModule, ClrIconModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss'
})
export class HeadComponent {

}
