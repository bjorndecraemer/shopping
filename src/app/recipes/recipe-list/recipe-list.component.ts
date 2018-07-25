import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() selectedRecipeChanged = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Crackers with stuff on it', 'This is simply a test description','https://c.pxhere.com/photos/fa/d4/eat_vegetables_food_kohl_nutrition_onions_healthy_meatless-424515.jpg!d'),
    new Recipe('Yummy Salad', 'This salad would make a beautiful presentation at your summertime get-togethers, or on your dinner table. It goes well with grilled options and balances out heavier main dishes. I think it would look cute as an appetizer, served in small glasses or ramekins.','https://c.pxhere.com/photos/27/e2/salad_lenses_avocado_bowl_yam_healthy_food_vitamins-1215185.jpg!d')
  ];

  onSelectedRecipeChanged(selRec : Recipe){
    this.selectedRecipeChanged.emit(selRec);
  }

  constructor() { }

  ngOnInit() {
    // if(this.recipes && this.recipes.length > 0){
    //   this.selectedRecipeChanged.emit(this.recipes[0]);
    // }
  }

}
