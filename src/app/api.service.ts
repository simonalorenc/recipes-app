import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { RecipeDto, RecipesListDto } from './recipes/data/recipe-dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private RECIPES_URL: string = 'https://dummyjson.com/recipes';

  constructor(private http: HttpClient) {}

  getRecpiesFromApi(): Observable<RecipeDto[]> {
    return this.http.get<RecipesListDto>(this.RECIPES_URL + '?limit=50')
      .pipe(map((recipes: RecipesListDto) => recipes.recipes));
  }
}
