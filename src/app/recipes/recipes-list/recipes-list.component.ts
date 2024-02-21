import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { RecipesRepository } from '../data/recipes-repository';
import { Recipe } from '../data/recipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeDetailComponent } from 'src/app/recipe-detail/recipe-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RecipeDetailComponent,
    FontAwesomeModule,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent implements OnChanges, OnDestroy {
  recipes!: Recipe[];
  @Input() isMealTypeChoosed!: boolean;
  @Input() filterInputValue!: string;
  currentPage: number = 1;
  totalNumberOfPages: number = 0;
  private readonly LIMIT_RECIPES_NUMBER: number = 10;
  private readonly NUMBER_OF_LETTERS: number = 6;
  private subscriptions: Subscription[] = [];
  nextIcon: IconDefinition = faChevronRight;
  previousIcon: IconDefinition = faChevronLeft;

  constructor(private recipesRepository: RecipesRepository) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.renderRecipesList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  private getRecipes(limitNumber: number, skipNumber: number) {
    const subscription: Subscription = this.recipesRepository
      .getRecipes(limitNumber, skipNumber)
      .subscribe((recipes) => {
        this.recipes = recipes.recipes;
        this.totalNumberOfPages = Math.ceil(
          recipes.total / this.LIMIT_RECIPES_NUMBER
        );
      });
    this.subscriptions.push(subscription)
  }

  private renderRecipesList() {
    if (this.isMealTypeChoosed) {
      console.log('wybrany type-meal');
      this.totalNumberOfPages = 1;
      this.filterRecipesByMealType();
    } else if (this.filterInputValue === '') {
      console.log('searchInput jest pusty i brak type-meal');
      this.getRecipes(this.LIMIT_RECIPES_NUMBER, 0);
      this.totalNumberOfPages = 5;
    } else if (this.filterInputValue !== '') {
      console.log('searchInput NIE jest pusty i brak type-meal');
      this.filterRecipesList(this.filterInputValue);
      this.currentPage = 1
    }
  }

  filterRecipesByMealType() {
    const subscription: Subscription = this.recipesRepository
      .getRecipesByMealType(this.filterInputValue)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
    this.subscriptions.push(subscription)
  }

  filterRecipesList(value: string) {
    const subscription: Subscription = this.recipesRepository.searchRecipes(value).subscribe((recipes) => {
      this.recipes = recipes;
      this.totalNumberOfPages = 1;
    });
    this.subscriptions.push(subscription)
  }

  setTotalPageNumbers() {}

  getMealTypeClassInTemplate(mealType: string) {
    return {
      'meal-type__small': mealType.length < this.NUMBER_OF_LETTERS,
      'meal-type__big': mealType.length >= this.NUMBER_OF_LETTERS,
    };
  }

  getNextPage() {
    this.currentPage++;
    const skipNumber = (this.currentPage - 1) * this.LIMIT_RECIPES_NUMBER;
    this.getRecipes(this.LIMIT_RECIPES_NUMBER, skipNumber);
  }

  getPreviousPage() {
    this.currentPage--;
    const skipNumber = (this.currentPage - 1) * this.LIMIT_RECIPES_NUMBER;
    this.getRecipes(this.LIMIT_RECIPES_NUMBER, skipNumber);
  }
}
