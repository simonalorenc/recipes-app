import { Component, ElementRef, ViewChild } from '@angular/core';
import { RecipesListComponent } from '../recipes/recipes-list/recipes-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RecipesListComponent,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FooterComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  mealTypes: string[] = [
    'dinner',
    'lunch',
    'snack',
    'dessert',
    'side dish',
    'appetizer',
    'breakfast',
    'beverage',
  ];
  isMealTypeChoosed: boolean = false;
  clickedMealType!: string
  clearIcon: IconDefinition = faTimes;
  clearMealTypeIcon: IconDefinition = faXmark

  constructor() {}

  onInputEvent() {
    this.deleteMealTypeFilter();
  }

  changeRecipesByMealType(mealType: string): void {
    this.searchInput.nativeElement.value = mealType;
    this.isMealTypeChoosed = true;
    this.clickedMealType = mealType
  }

  deleteMealTypeFilter(): void {
    this.isMealTypeChoosed = false;
  }

  clearFilterInput() { 
    this.searchInput.nativeElement.value = '';
    this.clickedMealType = ''
  }
}
