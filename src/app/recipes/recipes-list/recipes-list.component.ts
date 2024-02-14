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
  @Input() meals: Recipe[] = [];

  constructor(private recipesRepository: RecipesRepository) {}

  ngOnInit(): void {
    this.getAllRecipes()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeRecipesByMealType()
  }

  private getAllRecipes() {
    this.recipesRepository.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  changeRecipesByMealType() {
    if (this.isMealTypeChoosed) {
      this.recipes = this.meals
    } else {
      this.getAllRecipes()
    }
  }

  getMealTypeClass(mealType: string) {
    return {
      'meal-type__small': mealType.length < 6,
      'meal-type__big': mealType.length >= 6
    }
  }
}
