import { RecipeDto } from "./recipe-dto";

export class Recipe {
    id: number;
    name: string;
    ingridients: string[];
    instructions: string[];
    timeToPrepare: number;
    cookTime: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    tags: string[];
    imageUrl: string;
    rating: number;
    mealType: string[];

    constructor(dto: RecipeDto) {
        this.id = dto.id;
        this.name = dto.name;
        this.ingridients = dto.ingredients;
        this.instructions = dto.instructions;
        this.timeToPrepare = dto.prepTimeMinutes;
        this.cookTime = dto.cookTimeMinutes;
        this.servings = dto.servings;
        this.difficulty = dto.difficulty;
        this.cuisine = dto.cuisine;
        this.tags = dto.tags;
        this.imageUrl = dto.image;
        this.rating = dto.rating;
        this.mealType = dto.mealType;
    }
}