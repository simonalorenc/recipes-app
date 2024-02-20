import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipes/data/recipe';
import { RecipesRepository } from '../recipes/data/recipes-repository';
import { CommonModule } from '@angular/common';
import { SpacePipe } from '../space.pipe';
import { RecipesDataCache } from '../recipes/data/recipes-data-cache';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, SpacePipe],
  providers: [Location],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe
  isMobile!: boolean

  constructor(private activatedRoute: ActivatedRoute, private recipeRepository: RecipesRepository) {}

  ngOnInit(): void {
    this.getRecipe()
    this.checkScreenWidth()
  }

  @HostListener('window:resize', ['$event'])
  onResixe(event: Event): void {
    this.checkScreenWidth()
  }

  private getRecipe() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))

    this.recipeRepository.getRecipe(id).subscribe(
      recipe => this.recipe = recipe
    )
  }

  checkScreenWidth(): boolean {
    return this.isMobile = window.innerWidth <= 992
  }
}
