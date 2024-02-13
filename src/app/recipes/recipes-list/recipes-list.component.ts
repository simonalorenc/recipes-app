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

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule],
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

  getAllRecipes() {
    this.recipesRepository.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      console.log(recipes)
    });
  }

  changeRecipesByMealType() {
    if (this.isMealTypeChoosed) {
      this.recipes = this.meals
      console.log(this.meals);
    } else {
      this.getAllRecipes()
    }
  }
}
