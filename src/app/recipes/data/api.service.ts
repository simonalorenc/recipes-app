import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RecipeDto, RecipesListDto } from './recipe-dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //jedna zmienna BASE_URL a nazwy endpointów bezpośrednio w
  private RECIPES_URL: string = 'https://dummyjson.com/recipes';
  private RECIPE_URL: string = 'https://dummyjson.com/recipes/';
  private RECIPE_BY_MEAL_TYPE_URL: string = 'https://dummyjson.com/recipes/meal-type/'
  private SEARCH_RECIPE: string = 'https://dummyjson.com/recipes/search?q='

  constructor(private http: HttpClient) {}

  //niespójne nazwy najpier suffix fromApi, później juz nie, proponuje bez apiservice ma się tylko z api komunikować
  getRecpiesFromApi(limitNumber: number, skipNumber: number): Observable<RecipeDto[]> {
    return this.http.get<RecipesListDto>(this.RECIPES_URL + `?limit=${limitNumber}&skip=${skipNumber}`)
      .pipe(map((recipes: RecipesListDto) => recipes.recipes));
  }

  //one zbedne, widac po typie
  getOneRecipeFromApi(id: number): Observable<RecipeDto> {
    return this.http.get<RecipeDto>(this.RECIPE_URL + `${id}`)
  }

  getRecipesByMealType(mealType: string): Observable<RecipeDto[]> {
    return this.http.get<RecipesListDto>(this.RECIPE_BY_MEAL_TYPE_URL + `${mealType}`)
    .pipe(map((recipes: RecipesListDto) => recipes.recipes))
  }

  searchRecipes(value: string): Observable<RecipeDto[]> {
     return this.http.get<RecipesListDto>(this.SEARCH_RECIPE + `${value}`)
     .pipe(map((recipes: RecipesListDto) => recipes.recipes))
  }
  
}
