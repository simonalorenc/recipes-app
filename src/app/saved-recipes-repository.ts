import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RecipesRepository } from './recipes/data/recipes-repository';
import { Recipe } from './recipes/data/recipe';

@Injectable({
  providedIn: 'root',
})
export class SavedRecipesRepository {
  private COOKIE_KEY: string = 'SavedRecipes';
    
  constructor(
    private cookieService: CookieService,
    private recipesRepository: RecipesRepository
  ) {}

  private getAndParseSavedRecipesFromCookie(): number[] {
    const savedRecipesString = this.cookieService.get(this.COOKIE_KEY) || '[]';
    const savedRecipes = JSON.parse(savedRecipesString) as number[];
    return savedRecipes;
  }

  isRecipeSave(recipeId: number): boolean {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    return savedRecipes.includes(recipeId);
  }

  saveOrDeleteSavedRecipe(recipeIsSaved: boolean, recipeId: number): void {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    if (recipeIsSaved) {
      savedRecipes.push(recipeId);
    } else {
      const index = savedRecipes.findIndex((element) => element === recipeId);
      savedRecipes.splice(index, 1);
    }
    this.setSavedRecipesIdToCookie(savedRecipes);
  }

  private setSavedRecipesIdToCookie(recipesId: number[]) {
    this.cookieService.set(this.COOKIE_KEY, JSON.stringify(recipesId));
  }

  loadSavedRecipes(recipes: Recipe[]): void {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    savedRecipes.forEach((recipeId) => {
      this.recipesRepository.getRecipe(recipeId).subscribe((recipe) => {
        recipes.push(recipe);
        const customSort = this.sortSavedRecipesByAddTime();
        recipes.sort(customSort);
      });
    });
  }

  private sortSavedRecipesByAddTime() {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    const customSort = (a: Recipe, b: Recipe) => {
      const idA = savedRecipes.indexOf(a.id);
      const idB = savedRecipes.indexOf(b.id);

      return idA - idB;
    };
    return customSort;
  }

  deleteRecipeFromCookie(recipeId: number): void {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    const index = savedRecipes.findIndex((element) => element === recipeId);
    savedRecipes.splice(index, 1);
    this.setSavedRecipesIdToCookie(savedRecipes);
  }
}
