import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { MainComponent } from './main/main.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page/main/recipes-list', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent, children: [
    { path: 'main', component: MainComponent, children: [
      { path: 'recipes-list', component: RecipesListComponent }
    ]},
  ]},
  { path: 'detail/:id', component: RecipeDetailComponent },
  { path: 'saved-recipes', component: SavedRecipesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
