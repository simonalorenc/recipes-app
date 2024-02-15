import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecipesListComponent } from '../recipes/recipes-list/recipes-list.component';
import { CommonModule } from '@angular/common';
import { Recipe } from '../recipes/data/recipe';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RecipesListComponent, CommonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @ViewChild('searchInput') searchInput!: ElementRef

  mealTypes: string[] = ['dinner', 'lunch', 'snack', 'dessert', 'side dish', 'appetizer', 'breakfast', 'beverage']
  meals: Recipe[] = []
  filterInputValue: string = ''
  isMealTypeChoosed: boolean = false
  isMealTypeDeleted: boolean = true

  constructor(private recipesRepository: RecipesRepository) {
  }

  getFilterInputValue(text: string) {
    this.searchInput.nativeElement.value = text
    this.filterInputValue = text
  }

  changeRecipesByMealType(mealType: string): void {
    this.recipesRepository.getRecipesByMealType(mealType).subscribe(
      recipes => {
        this.meals = recipes
        this.searchInput.nativeElement.value = mealType
        this.isMealTypeChoosed = true
        this.isMealTypeDeleted = false
        console.log(this.isMealTypeChoosed)
      } 
    )
  }

  deleteMealTypeFilter(): void {
    this.isMealTypeDeleted = true
    this.isMealTypeChoosed = false
  }

  clearFilterInput() {
    this.searchInput.nativeElement.value = ''
  }
}
