import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipes/data/recipe';
import { ApiService } from '../recipes/data/api.service';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { CommonModule } from '@angular/common';
import { SpacePipe } from '../space.pipe';
import { RecipesDataCache } from '../recipes/data/recipes-data-cache';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, SpacePipe],
  providers: [Location],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private recipeRepository: RecipesRepository, private recipesDataCache: RecipesDataCache) {}

  ngOnInit(): void {
    this.getRecipe()
  }

  getRecipe() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))

    const recipe = this.recipesDataCache.getRecipeById(id)
    console.log(recipe)
    if(recipe) {
      this.recipe = recipe
    } else  if (!recipe) {
      this.recipeRepository.getOneRecipe(id).subscribe(
        recipe => this.recipe = recipe
      )
    }
  }
}
