import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService{

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients : Ingredient[] =[
    new Ingredient('Tomato',5),
    new Ingredient('Mozarella',200),
    new Ingredient('Salad',125)];

  getIngredients() : Ingredient[]{
    return this.ingredients.slice();
  }

  addIngredient(newIngredient: Ingredient){
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]){
    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
