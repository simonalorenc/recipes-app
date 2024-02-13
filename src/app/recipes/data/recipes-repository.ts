import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiService } from 'src/app/recipes/data/api.service';
import { Recipe } from './recipe';
import { RecipeDto } from './recipe-dto';

@Injectable({
  providedIn: 'root',
})
export class RecipesRepository {

  constructor(private apiService: ApiService) {}

  getRecipes(): Observable<Recipe[]> {
    return this.apiService.getRecpiesFromApi().pipe(
      map((recipeDtos: RecipeDto[]) => {
        return recipeDtos.map((recipeDto: RecipeDto) => new Recipe(recipeDto));
      })
    );
  }

  getOneRecipe(id: number): Observable<Recipe> {
    return this.apiService.getOneRecipeFromApi(id).pipe(
      map((recipeDto:RecipeDto) => new Recipe(recipeDto))
    )
  }

  getRecipesByMealType(mealType: string): Observable<Recipe[]> {
    return this.apiService.getRecipesByMealType(mealType).pipe(
      map((recipeDtos: RecipeDto[]) => {
        return recipeDtos.map((recipeDto: RecipeDto) => new Recipe(recipeDto))
      })
    )
  }
}
