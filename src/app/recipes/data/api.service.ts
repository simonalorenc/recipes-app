import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RecipeDto, RecipesListDto } from './recipe-dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private RECIPES_URL: string = 'https://dummyjson.com/recipes';
  private TAGS_URL: string = 'https://dummyjson.com/recipes/tags';
  private RECIPE_URL: string = 'https://dummyjson.com/recipes/';

  constructor(private http: HttpClient) {}

  getRecpiesFromApi(): Observable<RecipeDto[]> {
    return this.http.get<RecipesListDto>(this.RECIPES_URL + '?limit=50')
      .pipe(map((recipes: RecipesListDto) => recipes.recipes));
  }

  getTagsRecipesFromApi(): Observable<string[]> {
    return this.http.get<string[]>(this.TAGS_URL)
  }

  getOneRecipeFromApi(id: number): Observable<RecipeDto> {
    return this.http.get<RecipeDto>(this.RECIPE_URL + `${id}`)
  }
}
