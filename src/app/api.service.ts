import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe, RecipeDto, RecipesListDto } from './recipes/data/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private RECIPES_URL: string = 'https://dummyjson.com/recipes'

  recipesBehaviorSubject: BehaviorSubject<RecipeDto[]> = new BehaviorSubject<RecipeDto[]>([])

  constructor(private http: HttpClient) { }

  getRecpiesFromApi(): Observable<RecipesListDto> {
    return this.http.get<RecipesListDto>(this.RECIPES_URL + '?limit=50')
  }

  getAllRecipes(): void {
    this.getRecpiesFromApi().subscribe(
      recipes => { 
        const recipe = recipes.recipes
        this.recipesBehaviorSubject.next(recipe)
      },
      (error) => {
        console.error('GetAllRecipes error: ' + error)
      }
    )
  }

  getRecipesArray(): Observable<RecipeDto[]> {
    return this.recipesBehaviorSubject.asObservable()
  }
}
