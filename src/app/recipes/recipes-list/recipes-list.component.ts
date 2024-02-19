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
  recipes!: Recipe[]; //poproszę jakiś artykuł z tymi wykrzykikami, bo imo wygląda to źle
  @Input() isMealTypeChoosed!: boolean;
  @Input() isMealTypeDeleted!: boolean
  @Input() meals: Recipe[] = [];
  @Input() filterInputValue!: string
  currentPage: number = 1
  totalNumberOfPages: number = 5 // skad to wiadomo? trzeba na podstwie respone z api
  LIMIT_RECIPES_NUMBER: number = 10 //private
  SKIP_RECIPES_NUMBER: number = 0 //private
  nextIcon: IconDefinition = faChevronRight
  previousIcon: IconDefinition = faChevronLeft

  constructor(private recipesRepository: RecipesRepository) {}

  ngOnInit(): void {
    //czy to jest potrzebne skoro meals są od rodzica?
    //this.getRecipes(this.LIMIT_RECIPES_NUMBER, this.SKIP_RECIPES_NUMBER)
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
    //do weryfikacji logika, czemu 2 źródła prawdy? raz ładujemy recipels z repository w tym komponencie, a raz przekazujemy przez parenta (input meals)
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
      'meal-type__small': mealType.length < 6, //6 do zmiennej stałej
      'meal-type__big': mealType.length >= 6
    }
  }

  getNextPage(currentPage: number) {
    //nie jest brany limit pod uwagę
    // this.currentPage = currentPage  zbedne + argument funkcji
    this.currentPage++
    this.SKIP_RECIPES_NUMBER = this.SKIP_RECIPES_NUMBER + 10
    this.getRecipes(this.LIMIT_RECIPES_NUMBER, this.SKIP_RECIPES_NUMBER )
  }

  getPreviousPage(currentPage: number) {
        //nie jest brany limit pod uwagę
    // this.currentPage = currentPage zbedne + arugment funkcji
    this.currentPage--
    this.SKIP_RECIPES_NUMBER = this.SKIP_RECIPES_NUMBER - 10
    this.getRecipes(this.LIMIT_RECIPES_NUMBER, this.SKIP_RECIPES_NUMBER)
  }
}
