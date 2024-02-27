import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { CookieService } from 'ngx-cookie-service';
import { Recipe } from '../recipes/data/recipe';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Subscription } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent, RouterModule, FontAwesomeModule],
  providers: [CookieService],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.scss',
})
export class SavedRecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  savedRecipes: boolean = false
  private subscriptions: Subscription[] = [];
  foodIcon: IconDefinition = faPlateWheat

  constructor(
    private recipesRepository: RecipesRepository,
    private cookieService: CookieService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    const savedRecipesString = this.cookieService.get('SavedRecipes') || '[]';
    const savedRecipes = JSON.parse(savedRecipesString) as number[];
    if (savedRecipes.length != 0) {
      this.savedRecipes = true
    }
    savedRecipes.forEach((recipeId) => {
      const subscription = this.recipesRepository
        .getRecipe(recipeId)
        .subscribe((recipe) => this.recipes.push(recipe));
      this.subscriptions.push(subscription);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  navigateToRecipesList() {
    this.router.navigate(['/landing-page/main/recipes-list']).then(() => {
      const currentUrl = this.router.url;
      if (currentUrl === '/landing-page/main/recipes-list') {
        this.viewportScroller.scrollToAnchor('recipesList');
      }
    });
  }

  deleteRecipeFromSaved(recipeId: number) {
    const savedRecipesString = this.cookieService.get('SavedRecipes') || '[]';
    const savedRecipes = JSON.parse(savedRecipesString) as number[];
    if (savedRecipes.includes(recipeId)) {
      const index = savedRecipes.findIndex((element) => element === recipeId);
      savedRecipes.splice(index, 1);
      if(savedRecipes.length === 0) {
        this.savedRecipes = false
      }

      const indexInRecipes = this.recipes.findIndex(
        (recipe) => recipe.id === recipeId
      );
      this.recipes.splice(indexInRecipes, 1);

      this.cookieService.set('SavedRecipes', JSON.stringify(savedRecipes));
    }
  }
}
