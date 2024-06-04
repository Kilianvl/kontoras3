import { Component } from '@angular/core';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { remult } from 'remult';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [ClrDropdownModule, ClrIconModule, CommonModule],
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
