import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  ClrIconModule,
  ClrNavigationModule,
  ClrVerticalNavModule,
} from '@clr/angular';
import { CrmComponent } from '../crm/crm.component';
import { HeadComponent } from '../head/head.component';
import { featureFlags } from '../feature-flags';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
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
  featureFlags = featureFlags;
}
