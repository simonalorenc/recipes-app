import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RecipesRepository } from './recipes/data/recipes-repository';
import { Recipe } from './recipes/data/recipe';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavedRecipesRepository {
  private COOKIE_KEY: string = 'SavedRecipes';
    
  constructor(
    private cookieService: CookieService,
    private recipesRepository: RecipesRepository
  ) {}

  private getSavedRecipeIdsFromCookie(): number[] {
    const savedRecipesString = this.cookieService.get(this.COOKIE_KEY) || '[]';
    const savedRecipeIds = JSON.parse(savedRecipesString) as number[];
    return savedRecipeIds;
  }

  isRecipeSave(recipeId: number): boolean {
    const savedRecipeIds = this.getSavedRecipeIdsFromCookie();
    return savedRecipeIds.includes(recipeId);
  }

  saveOrDeleteSavedRecipe(recipeIsSaved: boolean, recipeId: number): void {
    const savedRecipeIds = this.getSavedRecipeIdsFromCookie();
    if (recipeIsSaved) {
      savedRecipeIds.push(recipeId);
    } else {
      const index = savedRecipeIds.findIndex((element) => element === recipeId);
      savedRecipeIds.splice(index, 1);
    }
    this.setSavedRecipesIdToCookie(savedRecipeIds);
  }

  private setSavedRecipesIdToCookie(recipesId: number[]) {
    this.cookieService.set(this.COOKIE_KEY, JSON.stringify(recipesId));
  }

  getSavedRecipesFromCookie(): Observable<Recipe[]> {
    const savedRecipeIds = this.getSavedRecipeIdsFromCookie();
    const observables = savedRecipeIds.map(id => {
      return this.recipesRepository.getRecipe(id)
    })
    return forkJoin(observables);
  }

  deleteRecipeFromCookie(recipeId: number): void {
    const savedRecipeIds = this.getSavedRecipeIdsFromCookie();
    const index = savedRecipeIds.findIndex((element) => element === recipeId);
    savedRecipeIds.splice(index, 1);
    this.setSavedRecipesIdToCookie(savedRecipeIds);
  }
}
