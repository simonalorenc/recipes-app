import { Component } from '@angular/core';
import { RecipesListComponent } from '../recipes/recipes-list/recipes-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RecipesListComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  mealTypes: string[] = ['dinner', 'lunch', 'snack', 'dessert', 'side dish', 'appetizer', 'breakfast', 'beverage']

}
