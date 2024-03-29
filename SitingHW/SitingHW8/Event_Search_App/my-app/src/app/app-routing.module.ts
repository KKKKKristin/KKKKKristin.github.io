import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "/search"},
  {path: "search", component: SearchComponent},
  {path: "favorites", component: FavoritesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
