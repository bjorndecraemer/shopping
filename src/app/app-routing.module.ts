import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {NgModule} from "@angular/core";


const appRoutes : Routes = [
  {path : '', redirectTo : '/recipes', pathMatch : 'full'},
  {path : 'shopping-list', component : ShoppingListComponent},
  {path : '**', redirectTo : 'recipes'}
];


@NgModule({
  imports : [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRoutingModule{}
