import { Injectable } from "@angular/core";
import { Recipe } from "./recipe";

@Injectable({
    providedIn: 'root',
  })
export class RecipesDataCache {
    private recipesMap: Map<number, Recipe> = new Map<number, Recipe>()

    saveRecipe(recipe: Recipe) {
        this.recipesMap.set(recipe.id, recipe)
        console.log(this.recipesMap)
    }

    getRecipeById(id: number): Recipe | undefined {
        return this.recipesMap.get(id)
    }
}
