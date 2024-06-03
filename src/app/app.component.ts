import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { ClarityModule } from "@clr/angular";
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head/head.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClarityModule, HeadComponent, NavigationComponent,CustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kontoras3';
}
