import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RecipesRepository } from '../data/recipes-repository';
import { Recipe } from '../data/recipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeDetailComponent } from 'src/app/recipe-detail/recipe-detail.component';
import { RecipesDataCache } from '../data/recipes-data-cache';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RecipeDetailComponent],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent implements OnInit, OnChanges {
  recipes!: Recipe[];
  @Input() isMealTypeChoosed!: boolean;
  @Input() isMealTypeDeleted!: boolean
  @Input() meals: Recipe[] = [];
  @Input() filterInputValue!: string
  filteredRecipes: Recipe[] = []
  currentPage: number = 1
  LIMIT_RECIPES_NUMBER: number = 10
  SKIP_RECIPES_NUMBER: number = 0

  constructor(private recipesRepository: RecipesRepository, private recipesDataCache: RecipesDataCache) {}

  ngOnInit(): void {
    this.getRecipes(this.LIMIT_RECIPES_NUMBER, this.SKIP_RECIPES_NUMBER)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeRecipesByMealType()
  }

  private getRecipes(limitNumber: number, skipNumber: number) {
    console.log('cokolwiek')
    this.recipesRepository.getRecipes(limitNumber, skipNumber).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  changeRecipesByMealType() {
    console.log( this.isMealTypeDeleted)
    if (this.isMealTypeChoosed) {
      this.recipes = this.meals
      console.log('filtered by meal type')
    } else if (this.filterInputValue.trim() === '' && !this.isMealTypeChoosed) {
      // this.getRecipes(this.LIMIT_RECIPES_NUMBER, this.SKIP_RECIPES_NUMBER)
      console.log('not filtered')
    } else if (this.filterInputValue.trim() !== '' && !this.isMealTypeChoosed) {
      this.filterRecipesList()
    }
  }

  filterRecipesList() {
    console.log('filtrujemy')
  }

  getMealTypeClass(mealType: string) {
    return {
      'meal-type__small': mealType.length < 6,
      'meal-type__big': mealType.length >= 6
    }
  }

  getNextPage(currentPage: number) {
    this.currentPage = currentPage
    this.currentPage++
    this.SKIP_RECIPES_NUMBER = this.SKIP_RECIPES_NUMBER + 10
    this.getRecipes(this.LIMIT_RECIPES_NUMBER, this.SKIP_RECIPES_NUMBER )
  }

  getPreviousPage(currentPage: number) {
    this.currentPage = currentPage
    this.currentPage--
    this.SKIP_RECIPES_NUMBER = this.SKIP_RECIPES_NUMBER - 10
    this.getRecipes(this.LIMIT_RECIPES_NUMBER, this.SKIP_RECIPES_NUMBER)
  }
}
