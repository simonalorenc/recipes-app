import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { Recipe } from '../recipes/data/recipe';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private TOP_RECIPE_IDS: number[] = [44, 9, 41];
  private CAROUSEL_INTERVAL: number = 2000;

  recipesToCarousel: Recipe[] = [];
  private currentIndex: number = 0;
  private subscriptions: Subscription[] = [];
  currentRecipe: Recipe | undefined;
  private lastScrollTop = 0;
  nextIcon: IconDefinition = faChevronRight;
  previousIcon: IconDefinition = faChevronLeft;

  constructor(
    private recipesRepository: RecipesRepository,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.TOP_RECIPE_IDS.forEach((id) => {
      const subscription = this.recipesRepository
        .getOneRecipe(id)
        .subscribe((recipe) => {
          this.recipesToCarousel.push(recipe);
          if (!this.currentRecipe) {
            this.currentRecipe = recipe;
          }
          if (id === this.TOP_RECIPE_IDS[this.TOP_RECIPE_IDS.length - 1]) {
            this.startCarousel();
          }
        });
      this.subscriptions.push(subscription);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  @ViewChild('carousel') carouselRef!: ElementRef;

  //sprawdzić z document: scroll
  @HostListener('window:scroll', ['event']) onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const translateX = scrollTop * 0.8 + 'px';
    const carousel = this.carouselRef.nativeElement as HTMLDivElement;

    if (scrollTop > this.lastScrollTop) {
      carousel.style.transform = `translate(${translateX}, 0)`;
    } else {
      carousel.style.transform = `translate(${translateX}, 0)`;
    }
  }

  private startCarousel(): void {
    const interval = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.recipesToCarousel.length;
      this.currentRecipe = this.recipesToCarousel[this.currentIndex];
    }, this.CAROUSEL_INTERVAL);
  }

  getNextRecipe(): void {
    this.currentIndex = (this.currentIndex + 1) % this.recipesToCarousel.length;
    this.currentRecipe = this.recipesToCarousel[this.currentIndex];
  }

  getPreviousRecipe(): void {
    this.currentIndex = (this.currentIndex - 1) % this.recipesToCarousel.length;
    this.currentRecipe = this.recipesToCarousel[this.currentIndex];
  }

  scrollToRecipesList(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
