import { Component, ElementRef, ViewChild } from '@angular/core';
import { RecipesListComponent } from '../recipes/recipes-list/recipes-list.component';
import { CommonModule } from '@angular/common';
import { Recipe } from '../recipes/data/recipe';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RecipesListComponent, CommonModule, RouterModule, FontAwesomeModule, FooterComponent],
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
  clearIcon: IconDefinition = faTimes

  constructor(private recipesRepository: RecipesRepository) {
  }

  getFilterInputValue(text: string) {
    //this.searchInput.nativeElement.value = text
    this.filterInputValue = text
  }

  //korzystac z repository w jednym miejscu do zarzadzania tym co jest na liscie
  changeRecipesByMealType(mealType: string): void {
    this.recipesRepository.getRecipesByMealType(mealType).subscribe(
      recipes => {
        this.meals = recipes
        this.searchInput.nativeElement.value = mealType
        //wytlumaczyc czemu sa potrzebne dwie flagi, czy mogą przyjść kiedyś taką samą wartość?
        this.isMealTypeChoosed = true
        this.isMealTypeDeleted = false
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
