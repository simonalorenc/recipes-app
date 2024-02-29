import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnChanges {
  private readonly ANIMATION_TIME = 1500

  @Input() newSavedRecipe!: boolean

  searchIcon: IconDefinition = faMagnifyingGlass;
  saveIcon: IconDefinition = faBookmark;
  iconClass: string = ''

  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.newSavedRecipe) {
      this.iconClass = 'active'
      setTimeout(() => this.iconClass = '', this.ANIMATION_TIME)
    }
  }

  goToMainPage() {
    this.router.navigate(['/landing-page/main/recipes-list'])
  }

  scrollToRecipes(): void {
    const currentUrl = this.router.url
    if(currentUrl === '/landing-page/main/recipes-list') {
      this.viewportScroller.scrollToPosition([0, window.innerHeight]);
    } else {
      this.router.navigate(['/landing-page/main/recipes-list']).then(() => {
        this.viewportScroller.scrollToPosition([0, window.innerHeight]);
      })
    }
  }
}
