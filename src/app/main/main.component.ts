import { Component } from '@angular/core';
import { RecipesListComponent } from '../recipes/recipes-list/recipes-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RecipesListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
