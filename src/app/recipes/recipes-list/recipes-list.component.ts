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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RecipeDetailComponent, FontAwesomeModule],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent implements OnInit, OnChanges {
  recipes!: Recipe[];
  @Input() isMealTypeChoosed!: boolean;
  @Input() isMealTypeDeleted!: boolean
  @Input() meals: Recipe[] = [];
  @Input() filterInputValue!: string
  currentPage: number = 1
  totalNumberOfPages: number = 5
  LIMIT_RECIPES_NUMBER: number = 10
  SKIP_RECIPES_NUMBER: number = 0
  nextIcon: IconDefinition = faChevronRight
  previousIcon: IconDefinition = faChevronLeft

  constructor(private recipesRepository: RecipesRepository) {}

  ngOnInit(): void {
    this.getRecipes(this.LIMIT_RECIPES_NUMBER, this.SKIP_RECIPES_NUMBER)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderRecipesList(this.filterInputValue)
  }

  private getRecipes(limitNumber: number, skipNumber: number) {
    this.recipesRepository.getRecipes(limitNumber, skipNumber).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  renderRecipesList(value: string) {
    if (this.isMealTypeChoosed) {
      this.recipes = this.meals
      if (this.recipes.length > 10) {
        this.totalNumberOfPages = 1
      }
    } else if (value === '' && !this.isMealTypeChoosed) {
      this.getRecipes(this.LIMIT_RECIPES_NUMBER, this.SKIP_RECIPES_NUMBER)
      this.totalNumberOfPages = 5
    } else if (value !== '' && !this.isMealTypeChoosed) {
      this.filterRecipesList(value)
    }
  }

  filterRecipesList(value: string) {
    this.recipesRepository.searchRecipes(value).subscribe(
      recipes => {
        this.recipes = recipes
        if (this.recipes.length > 10) {
          this.totalNumberOfPages = 1
        }
      }
    )
  }

  getMealTypeClassInTemplate(mealType: string) {
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
