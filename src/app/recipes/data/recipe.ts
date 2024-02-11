export interface RecipesListDto {
  recipes: RecipeDto[];
  total: number;
  skip: number;
  limit: number;
}

export interface RecipeDto {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface Recipe {
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
  mealType: string;
}
