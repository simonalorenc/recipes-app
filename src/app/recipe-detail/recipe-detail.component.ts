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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { NavbarComponent } from '../navbar/navbar.component';
import { SavedRecipesRepository } from '../saved-recipes-repository';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    CommonModule,
    SpacePipe,
    StarRatingComponent,
    FontAwesomeModule,
    NavbarComponent,
  ],
  providers: [Location],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private readonly ALERT_TIME = 3000

  recipe!: Recipe;
  isMobile!: boolean;
  rate!: number;
  private currentUrl: string = '';
  urlIsCopiedAlert: boolean = false;
  recipeIsSaved!: boolean;
  savedRecipesAlert: boolean = false;
  private subscription!: Subscription;
  saveIcon: IconDefinition = regularBookmark;
  savedIcon: IconDefinition = solidBookmark;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeRepository: RecipesRepository,
    private location: Location,
    private router: Router,
    private clipboard: Clipboard,
    private savedRecipesRepository: SavedRecipesRepository,
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
        this.recipeIsSaved = this.savedRecipesRepository.checkIfRecipeIsSave(
          this.recipe.id
        );
      });
  }

  private checkScreenWidth(): boolean {
    return (this.isMobile = window.innerWidth <= 992);
  }

  goBack(): void {
    this.location.back();
  }

  shareRecipe(): void {
    this.urlIsCopiedAlert = true;
    this.currentUrl = this.router.url;
    this.clipboard.copy(this.currentUrl);
    if (this.urlIsCopiedAlert) {
      setTimeout(() => {
        this.urlIsCopiedAlert = false;
      }, this.ALERT_TIME);
    }
  }

  saveOrDeleteSavedRecipe(): void {
    this.recipeIsSaved = !this.recipeIsSaved;
    if(this.recipeIsSaved) {
      this.savedRecipesAlert = true;
      setTimeout(() => {
        this.savedRecipesAlert = false;
      }, this.ALERT_TIME);
    }
    this.savedRecipesRepository.saveOrDeleteSavedRecipe(
      this.recipeIsSaved,
      this.recipe.id,
    );
  }
}
