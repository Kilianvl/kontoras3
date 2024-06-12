import { Component } from '@angular/core';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { remult } from 'remult';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [ClrDropdownModule, ClrIconModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss',
})
export class HeadComponent {
  remult = remult;
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logOut();
  }
}
