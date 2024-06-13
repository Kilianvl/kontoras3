import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClarityModule } from "@clr/angular";
import { AuthService } from './auth/auth.service';
import { HeadComponent } from './head/head.component';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, ClarityModule, HeadComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(@Inject(AuthService) public authService: AuthService) {}

  title = 'kontoras3';
}
