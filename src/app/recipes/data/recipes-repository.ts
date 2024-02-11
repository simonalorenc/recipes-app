import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/api.service';
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
}
