import { Recipe } from "./recipe";

export class RecipesWithTotal {
    recipes: Recipe[]
    total: number

    constructor(recipes: Recipe[], total: number) {
        this.recipes = recipes
        this.total = total
    }
}
