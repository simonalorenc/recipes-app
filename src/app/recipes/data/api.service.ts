import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RecipeDto, RecipesListDto } from './recipe-dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL: string = 'https://dummyjson.com/recipes';

  constructor(private http: HttpClient) {}

  getRecpies(limitNumber: number, skipNumber: number): Observable<RecipesListDto> {
    return this.http
      .get<RecipesListDto>(
        this.BASE_URL + `?limit=${limitNumber}&skip=${skipNumber}`
      )
  }

  getRecipe(id: number): Observable<RecipeDto> {
    return this.http.get<RecipeDto>(this.BASE_URL + `/${id}`);
  }

  getRecipesByMealType(mealType: string): Observable<RecipeDto[]> {
    return this.http
      .get<RecipesListDto>(this.BASE_URL + `/meal-type/${mealType}`)
      .pipe(map((recipes: RecipesListDto) => recipes.recipes));
  }

  searchRecipes(value: string): Observable<RecipeDto[]> {
    return this.http
      .get<RecipesListDto>(this.BASE_URL + `/search?q=${value}`)
      .pipe(map((recipes: RecipesListDto) => recipes.recipes));
  }
}
