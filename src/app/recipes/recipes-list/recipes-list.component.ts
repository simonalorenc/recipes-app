import { Component, OnInit } from '@angular/core';
import { RecipesRepository } from '../data/recipes-repository';
import { Recipe } from '../data/recipe';
import { CommonModule } from '@angular/common';
import { ApiService } from '../data/api.service';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {
  recipes!: Recipe[]

  constructor(private recipesRepository: RecipesRepository) {}

  ngOnInit(): void {
    this.recipesRepository.getRecipes().subscribe(
      recipes => {
        this.recipes = recipes
      } 
    )
  }
}
