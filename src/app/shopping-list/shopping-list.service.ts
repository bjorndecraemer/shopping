import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";


export class ShoppingListService{

  ingredientsChanged = new Subject<Ingredient[]>();

  startedEditing = new Subject<number>();


  private ingredients : Ingredient[] =[
    new Ingredient('Tomato',5),
    new Ingredient('Mozarella',200),
    new Ingredient('Salad',125)];

  getIngredients() : Ingredient[]{
    return this.ingredients.slice();
  }

  setIngredients(newIngredients : Ingredient[]){
    this.ingredients = newIngredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
