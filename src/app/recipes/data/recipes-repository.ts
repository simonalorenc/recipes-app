import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/recipes/data/api.service';
import { Recipe } from './recipe';
import { RecipeDto } from './recipe-dto';
import { RecipesDataCache } from './recipes-data-cache';

@Injectable({
  providedIn: 'root',
})
export class RecipesRepository {

  constructor(private apiService: ApiService, private recipesDataCache: RecipesDataCache) {}

  getRecipes(limitNumber: number, skipNumber: number): Observable<Recipe[]> {
    return this.apiService.getRecpiesFromApi(limitNumber, skipNumber).pipe(
      map((recipeDtos: RecipeDto[]) => {
        return recipeDtos.map((recipeDto: RecipeDto) => {
          const recipe = new Recipe(recipeDto)
          this.recipesDataCache.saveRecipe(recipe)
          return recipe
        });
      })
    );
  }

  //wystarczy nazwa getRecipe, po typie widać ze jest jeden
  getOneRecipe(id: number): Observable<Recipe> {
    //tutaj nalezy wykorzystac cache i sprawdzic czy recipe o takim id nie jest dostepny zamast wrzykiwac cache w komponencie
    return this.apiService.getOneRecipeFromApi(id).pipe(
      map((recipeDto:RecipeDto) => new Recipe(recipeDto))
    )
  }

  getRecipesByMealType(mealType: string): Observable<Recipe[]> {
    return this.apiService.getRecipesByMealType(mealType).pipe(
      map((recipeDtos: RecipeDto[]) => {
        //brakuje zapisu do cache proponuje wydzielic do osobnej metody
        return recipeDtos.map((recipeDto: RecipeDto) => new Recipe(recipeDto))
      })
    )
  }

  searchRecipes(value: string): Observable<Recipe[]> {
    return this.apiService.searchRecipes(value).pipe(
      map((recipesDto: RecipeDto[]) => {
        //brakuje zapisu do cache proponuje wydzielic do osobnej metody
        return recipesDto.map((recipeDto: RecipeDto) => new Recipe(recipeDto))
      })
    )
  }
}
