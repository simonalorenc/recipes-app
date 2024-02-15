import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { Recipe } from '../recipes/data/recipe';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private TOP_RECIPE_IDS: number[] = [44, 28, 41];
  private CAROUSEL_INTERVAL: number = 2000;

  private recipesToCarousel: Recipe[] = [];
  private currentIndex: number = 0;
  private subscriptions: Subscription[] = []
  currentRecipe: Recipe | undefined;

  constructor(private recipesRepository: RecipesRepository, private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    console.log(this.router.url)
    this.TOP_RECIPE_IDS.forEach((id) => {
      const subscription = this.recipesRepository.getOneRecipe(id).subscribe((recipe) => {
        this.recipesToCarousel.push(recipe);
        if (!this.currentRecipe) {
          this.currentRecipe = recipe;
        }
        if (id === this.TOP_RECIPE_IDS[this.TOP_RECIPE_IDS.length - 1]) {
          this.startCarousel()
        }
      });
      this.subscriptions.push(subscription)
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  private startCarousel(): void {
    const interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.recipesToCarousel.length;
      this.currentRecipe = this.recipesToCarousel[this.currentIndex];
    }, this.CAROUSEL_INTERVAL);
  }

  scrollToRecipesList(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId)
  }
}
