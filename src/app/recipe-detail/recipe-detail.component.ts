import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipes/data/recipe';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { CommonModule } from '@angular/common';
import { SpacePipe } from '../space.pipe';
import { RecipesDataCache } from '../recipes/data/recipes-data-cache';
import { JoinPipe } from '../join.pipe';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, SpacePipe, JoinPipe],
  providers: [Location],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe
  isMobile!: boolean

  //zbedny router
  constructor(private route: Router, private activatedRoute: ActivatedRoute, private recipeRepository: RecipesRepository, private recipesDataCache: RecipesDataCache) {}

  ngOnInit(): void {
    this.getRecipe()
  }

  @HostListener('window:resize', ['$event'])
  onResixe(event: Event): void {
    this.checkScreenWidth()
  }

  //private?
  getRecipe() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))

    const recipe = this.recipesDataCache.getRecipeById(id)
    if(recipe) {
      this.recipe = recipe
    } else  if (!recipe) {
      this.recipeRepository.getOneRecipe(id).subscribe(
        recipe => this.recipe = recipe
      )
    }
  }

  //private?
  checkScreenWidth(): boolean {
    //po co return? wykorzystac zmienna
    this.isMobile = window.innerWidth <= 992
    return this.isMobile
  }
}
