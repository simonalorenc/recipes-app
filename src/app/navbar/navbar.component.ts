import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  @Output() scrollToRecipesList = new EventEmitter<void>();
  @Input() newSavedRecipe!: boolean

  searchIcon: IconDefinition = faMagnifyingGlass;
  saveIcon: IconDefinition = faBookmark;
  iconClass: string = ''

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.newSavedRecipe) {
      this.iconClass = 'active'
      setTimeout(() => this.iconClass = '', 1500) 
    }
  }

  scrollToRecipes(): void {
    this.scrollToRecipesList.emit();
  }
}
