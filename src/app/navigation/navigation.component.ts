import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  ClrIconModule,
  ClrNavigationModule,
  ClrVerticalNavModule,
} from '@clr/angular';
import { HeadComponent } from '../head/head.component';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    ClrNavigationModule,
    ClrIconModule,
    RouterLink,
    RouterLinkActive,
    ClrVerticalNavModule,
    RouterOutlet,
    HeadComponent,
    CustomerComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  demoCollapsible = false;
}
