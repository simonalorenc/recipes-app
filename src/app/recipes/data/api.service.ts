import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RecipeDto, RecipesListDto } from './recipe-dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private RECIPES_URL: string = 'https://dummyjson.com/recipes';
  private RECIPE_URL: string = 'https://dummyjson.com/recipes/';
  private RECIPE_BY_MEAL_TYPE_URL: string = 'https://dummyjson.com/recipes/meal-type/'

  constructor(private http: HttpClient) {}

  getRecpiesFromApi(limitNumber: number, skipNumber: number): Observable<RecipeDto[]> {
    return this.http.get<RecipesListDto>(this.RECIPES_URL + `?limit=${limitNumber}&skip=${skipNumber}`)
      .pipe(map((recipes: RecipesListDto) => recipes.recipes));
  }

  getOneRecipeFromApi(id: number): Observable<RecipeDto> {
    return this.http.get<RecipeDto>(this.RECIPE_URL + `${id}`)
  }

  getRecipesByMealType(mealType: string): Observable<RecipeDto[]> {
    return this.http.get<RecipesListDto>(this.RECIPE_BY_MEAL_TYPE_URL + `${mealType}`).pipe(map((recipes: RecipesListDto) => recipes.recipes))
  }
  
}
