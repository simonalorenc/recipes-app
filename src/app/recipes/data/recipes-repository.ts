import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ApiService } from 'src/app/recipes/data/api.service';
import { Recipe } from './recipe';
import { RecipeDto, RecipesListDto } from './recipe-dto';
import { RecipesDataCache } from './recipes-data-cache';
import { RecipesWithTotal } from './recipes-with-total';

@Injectable({
  providedIn: 'root',
})
export class RecipesRepository {

  constructor(private apiService: ApiService, private recipesDataCache: RecipesDataCache) {}

  saveRecipeToDataCache(recipe: Recipe) {
    this.recipesDataCache.saveRecipe(recipe)
  }

  getRecipes(limitNumber: number, skipNumber: number): Observable<RecipesWithTotal> {
    return this.apiService.getRecpies(limitNumber, skipNumber).pipe(
      map((recipesListDto: RecipesListDto) => {
        return new RecipesWithTotal(
          recipesListDto.recipes.map(recipeDto => new Recipe(recipeDto)),
          recipesListDto.total)
      })
    );
  }

  getRecipe(id: number): Observable<Recipe> {
    const recipe = this.recipesDataCache.getRecipeById(id)
    if(recipe) {
      return of(recipe)
    } else {
      return this.apiService.getRecipe(id).pipe(
        map((recipeDto:RecipeDto) => new Recipe(recipeDto))
      )
    }
  }

  getRecipesByMealType(mealType: string): Observable<Recipe[]> {
    return this.apiService.getRecipesByMealType(mealType).pipe(
      map((recipeDtos: RecipeDto[]) => {
        return recipeDtos.map((recipeDto: RecipeDto) => {
          const recipe = new Recipe(recipeDto)
          this.saveRecipeToDataCache(recipe)
          return recipe
        })
      })
    )
  }

  searchRecipes(value: string): Observable<Recipe[]> {
    return this.apiService.searchRecipes(value).pipe(
      map((recipesDto: RecipeDto[]) => {
        return recipesDto.map((recipeDto: RecipeDto) => {
          const recipe = new Recipe(recipeDto)
          this.saveRecipeToDataCache(recipe)
          return recipe
        })
      })
    )
  }
}
