import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly RECIPE_SCREEN = 0;
  readonly SHOPPING_SCREEN = 1;

  private selectedScreen = this.RECIPE_SCREEN;

  onRecipesSelected(){
    this.selectedScreen = this.RECIPE_SCREEN;
  }

  onShoppingSelected(){
    this.selectedScreen = this.SHOPPING_SCREEN;
  }

}
