import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutingService } from '../routing.service';
import { LandingPageComponent } from '../landing-page/landing-page.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() scrollToRecipesList = new EventEmitter<void>()

  constructor(private viewportScroller: ViewportScroller) {}

  scrollToRecipes(): void {
    this.scrollToRecipesList.emit()
  }
}
