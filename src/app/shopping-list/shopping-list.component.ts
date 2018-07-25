import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : Ingredient[] = [];


  constructor() {
    this.ingredients = [
      new Ingredient('Tomato',5),
      new Ingredient('Mozarella',200),
      new Ingredient('Salad',125)]

  }

  ngOnInit() {
  }

  onAddedNewIngredient(newIngredient : Ingredient){
    this.ingredients.push(newIngredient);
  }

}
