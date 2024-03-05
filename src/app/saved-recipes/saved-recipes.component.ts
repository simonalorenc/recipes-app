import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { SavedRecipesRepository } from '../saved-recipes-repository';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    FooterComponent,
    RouterModule,
    FontAwesomeModule,
  ],
  providers: [CookieService],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.scss',
})
export class SavedRecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private subscriptions: Subscription[] = [];
  foodIcon: IconDefinition = faPlateWheat;

  constructor(
    private savedRecipesRepository: SavedRecipesRepository,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.savedRecipesRepository.loadSavedRecipes(this.recipes);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  deleteRecipeFromSaved(recipeId: number): void {
    this.savedRecipesRepository.deleteRecipeFromCookie(recipeId);
    this.deleteSavedRecipeFromView(recipeId, this.recipes);
  }

  deleteSavedRecipeFromView(recipeId: number, recipes: Recipe[]): void {
    const indexInRecipes = recipes.findIndex(
      (recipe) => recipe.id === recipeId
    );
    recipes.splice(indexInRecipes, 1);
  }

  navigateToRecipesList() {
    this.router.navigate(['/landing-page/main/recipes-list']).then(() => {
      setTimeout(() => {
        const currentUrl = this.router.url;
        if (currentUrl === '/landing-page/main/recipes-list') {
          this.viewportScroller.scrollToPosition([0, window.innerHeight]);
        }
      }, 100);
    });
  }
}
