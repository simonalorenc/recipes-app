import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page/main', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'main', component: MainComponent, children: [
      { path: 'recipes-list', component: RecipesListComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
