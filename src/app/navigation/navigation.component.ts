import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { ClrIconModule, ClrNavigationModule, ClrVerticalNavModule } from '@clr/angular';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ClrNavigationModule,ClrIconModule, RouterLinkActive, ClrVerticalNavModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  demoCollapsible = false;
}
