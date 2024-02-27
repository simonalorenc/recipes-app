import { Component, OnInit } from '@angular/core';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { CookieService } from 'ngx-cookie-service';
import { Recipe } from '../recipes/data/recipe';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent],
  providers: [CookieService],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.scss'
})
export class SavedRecipesComponent implements OnInit{
  recipes: Recipe[] = []

  constructor(private recipesRepository: RecipesRepository, private cookieService: CookieService, private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    const savedRecipesString = this.cookieService.get('SavedRecipes') || '[]';
    const savedRecipes = JSON.parse(savedRecipesString) as number[];
    console.log(savedRecipes)
    savedRecipes.forEach(recipeId => {
      this.recipesRepository.getRecipe(recipeId).subscribe(
        recipe => this.recipes.push(recipe)
      )
    })
  }

  navigateToRecipesList() {
    this.router.navigate(['/landing-page/main/recipes-list']).then(() => {
      const currentUrl = this.router.url;
      if (currentUrl === '/landing-page/main/recipes-list') {
        this.viewportScroller.scrollToAnchor('recipesList');
      }
    });
  }
}
