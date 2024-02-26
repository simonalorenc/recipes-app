import { Component, OnInit } from '@angular/core';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { CookieService } from 'ngx-cookie-service';
import { Recipe } from '../recipes/data/recipe';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [NavbarComponent],
  providers: [CookieService],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.scss'
})
export class SavedRecipesComponent implements OnInit{
  recipes!: Recipe[]

  constructor(private recipesRepository: RecipesRepository, private cookieService: CookieService) {}

  ngOnInit(): void {
    const savedRecipesString = this.cookieService.get('SavedRecipes') || '[]';
    const savedRecipes = JSON.parse(savedRecipesString) as number[];
    console.log(savedRecipes)
    savedRecipes.forEach(recipeId => {
      this.recipesRepository.getRecipe(recipeId).subscribe(
        recipe => console.log(recipe)
      )
    })
  }
}
