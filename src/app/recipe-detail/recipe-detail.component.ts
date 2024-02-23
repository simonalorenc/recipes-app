import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipes/data/recipe';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { CommonModule } from '@angular/common';
import { SpacePipe } from '../pipes/space.pipe';
import { StarRatingComponent } from '../stars-rating/star-rating.component';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, SpacePipe, StarRatingComponent],
  providers: [Location],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe!: Recipe
  isMobile!: boolean
  rate!: number
  private subscription!: Subscription

  constructor(private activatedRoute: ActivatedRoute, private recipeRepository: RecipesRepository, private location: Location) {}

  ngOnInit(): void {
    this.getRecipe()
    this.checkScreenWidth()
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  @HostListener('window:resize', ['$event'])
  onResixe(event: Event): void {
    this.checkScreenWidth()
  }

  private getRecipe() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))

    this.subscription = this.recipeRepository.getRecipe(id).subscribe(
      recipe => {
        this.recipe = recipe
        this.rate = recipe.rating
      })
  }

  private checkScreenWidth(): boolean {
    console.log("check screen")
    console.log(this.isMobile = window.innerWidth <= 992)
    console.log(window.innerWidth)
    return this.isMobile = window.innerWidth <= 992
  }

  goBack(): void {
    this.location.back()
  }
}
