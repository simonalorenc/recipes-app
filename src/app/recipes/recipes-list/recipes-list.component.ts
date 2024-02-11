import { Component, OnInit } from '@angular/core';
import { RecipesRepository } from '../data/recipes-repository';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {

  constructor(private recipesRepository: RecipesRepository) {}

  ngOnInit(): void {
    this.recipesRepository.getRecipes().subscribe(
      recipe => console.log(recipe)
    )
  }
}
