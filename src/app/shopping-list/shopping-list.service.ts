import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{

  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients : Ingredient[] =[
    new Ingredient('Tomato',5),
    new Ingredient('Mozarella',200),
    new Ingredient('Salad',125)];

  getIngredients() : Ingredient[]{
    return this.ingredients.slice();
  }

  addIngredient(newIngredient: Ingredient){
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]){
    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
