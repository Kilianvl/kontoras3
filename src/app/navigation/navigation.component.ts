import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  ClrIconModule,
  ClrNavigationModule,
  ClrVerticalNavModule,
} from '@clr/angular';
import { CrmComponent } from '../crm/crm.component';
import { HeadComponent } from '../head/head.component';

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
    CrmComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  demoCollapsible = false;
}
