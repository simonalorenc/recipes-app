import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { RecipesListDto } from '../data/recipe';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllRecipes()
    this.apiService.getRecipesArray().subscribe(
      recipe => console.log(recipe)
    )
  }
}
