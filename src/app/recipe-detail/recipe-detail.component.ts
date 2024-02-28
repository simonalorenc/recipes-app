import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipes/data/recipe';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { CommonModule, ViewportScroller } from '@angular/common';
import { SpacePipe } from '../pipes/space.pipe';
import { StarRatingComponent } from '../stars-rating/star-rating.component';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { CookieService } from 'ngx-cookie-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, SpacePipe, StarRatingComponent, FontAwesomeModule, NavbarComponent],
  providers: [Location, CookieService],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe!: Recipe;
  isMobile!: boolean;
  rate!: number;
  currentUrl: string = '';
  urlIsCopied: boolean = false;
  recipeIsSaved!: boolean;
  savedRecipesAlert: boolean = false
  private subscription!: Subscription;
  saveIcon: IconDefinition = regularBookmark;
  savedIcon: IconDefinition = solidBookmark;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeRepository: RecipesRepository,
    private location: Location,
    private router: Router,
    private clipboard: Clipboard,
    private cookieService: CookieService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.getRecipe();
    this.checkScreenWidth();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResixe(event: Event): void {
    this.checkScreenWidth();
  }

  private getRecipe() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.subscription = this.recipeRepository
      .getRecipe(id)
      .subscribe((recipe) => {
        this.recipe = recipe;
        this.rate = recipe.rating;
        const savedRecipesString =
          this.cookieService.get('SavedRecipes') || '[]';
        const savedRecipes = JSON.parse(savedRecipesString) as number[];
        if (savedRecipes.includes(this.recipe.id)) {
          this.recipeIsSaved = true;
        }
      });
  }

  private checkScreenWidth(): boolean {
    return (this.isMobile = window.innerWidth <= 992);
  }

  goBack(): void {
    this.location.back();
  }

  shareRecipe(): void {
    this.urlIsCopied = true;
    this.currentUrl = this.router.url;
    this.clipboard.copy(this.currentUrl);
    if (this.urlIsCopied) {
      setTimeout(() => {
        this.urlIsCopied = false
      }, 3000)
    }
  }

  saveOrDeleteSavedRecipe(): void {
    this.recipeIsSaved = !this.recipeIsSaved;
    const savedRecipesString = this.cookieService.get('SavedRecipes') || '[]';
    const savedRecipes = JSON.parse(savedRecipesString) as number[];
    if (this.recipeIsSaved) {
      savedRecipes.push(this.recipe.id);
      this.cookieService.set('SavedRecipes', JSON.stringify(savedRecipes));
      this.savedRecipesAlert = true
      setTimeout(() => {
        this.savedRecipesAlert = false
      }, 3000)
    } else if (!this.recipeIsSaved) {
      const recipeId = this.recipe.id
      const index = savedRecipes.findIndex((element) => element === recipeId);
      savedRecipes.splice(index, 1);
      this.cookieService.set('SavedRecipes', JSON.stringify(savedRecipes));
    }
  }

  navigateToRecipesList() {
    this.router.navigate(['/landing-page/main/recipes-list']).then(() => {
      const currentUrl = this.router.url;
      if (currentUrl === '/landing-page/main/recipes-list') {
        this.viewportScroller.scrollToPosition([0, window.innerHeight]);
      }
    });
  }
}
