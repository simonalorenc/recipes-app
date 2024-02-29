import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RecipesRepository } from './recipes/data/recipes-repository';
import { Recipe } from './recipes/data/recipe';

@Injectable({
  providedIn: 'root',
})
export class SavedRecipesRepository {
    
  constructor(
    private cookieService: CookieService,
    private recipesRepository: RecipesRepository
  ) {}

  getAndParseSavedRecipesFromCookie(): number[] {
    const savedRecipesString = this.cookieService.get('SavedRecipes') || '[]';
    const savedRecipes = JSON.parse(savedRecipesString) as number[];
    return savedRecipes;
  }

  checkIfRecipeIsSave(recipeId: number): boolean {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    if (savedRecipes.includes(recipeId)) {
      return true;
    } else {
      return false;
    }
  }

  saveOrDeleteSavedRecipe(recipeIsSaved: boolean, recipeId: number): void {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    if (recipeIsSaved) {
      savedRecipes.push(recipeId);
      this.cookieService.set('SavedRecipes', JSON.stringify(savedRecipes));
    } else if (!recipeIsSaved) {
      const index = savedRecipes.findIndex((element) => element === recipeId);
      savedRecipes.splice(index, 1);
      this.cookieService.set('SavedRecipes', JSON.stringify(savedRecipes));
    }
  }

  checkSavedRecipes(): boolean {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    if (savedRecipes.length != 0) {
      return true;
    } else {
      return false;
    }
  }

  renderSavedRecipes(recipes: Recipe[]): void {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    console.log('saved: ' + savedRecipes);
    savedRecipes.forEach((recipeId) => {
      this.recipesRepository.getRecipe(recipeId).subscribe((recipe) => {
        recipes.push(recipe);
        const customSort = this.sortSavedRecipesByAddTime();
        recipes.sort(customSort);
      });
    });
  }

  sortSavedRecipesByAddTime() {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    const customSort = (a: Recipe, b: Recipe) => {
      const idA = savedRecipes.indexOf(a.id);
      const idB = savedRecipes.indexOf(b.id);

      return idA - idB;
    };
    return customSort;
  }

  deleteRecipeFromSaved(recipeId: number, recipes: Recipe[]): void {
    const savedRecipes = this.getAndParseSavedRecipesFromCookie();
    if (savedRecipes.includes(recipeId)) {
      const index = savedRecipes.findIndex((element) => element === recipeId);
      savedRecipes.splice(index, 1);

      const indexInRecipes = recipes.findIndex(
        (recipe) => recipe.id === recipeId
      );
      recipes.splice(indexInRecipes, 1);

      this.cookieService.set('SavedRecipes', JSON.stringify(savedRecipes));
    }
  }
}
