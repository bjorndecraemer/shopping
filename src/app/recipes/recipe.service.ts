import {Recipe} from "./recipe.model";
import {Subject} from "rxjs";
import {Ingredient} from "../shared/ingredient.model";

export class RecipeService {
recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[]
  = [
    new Recipe(
      'Crackers with stuff on it',
      'This is simply a test description',
      'https://c.pxhere.com/photos/fa/d4/eat_vegetables_food_kohl_nutrition_onions_healthy_meatless-424515.jpg!d',
      [new Ingredient('Cracker',2),
        new Ingredient('Cherry-tomato',5),
        new Ingredient('Cracker',2)]),
    new Recipe(
      'Yummy Salad',
      'This salad would make a beautiful presentation at your summertime get-togethers, or on your dinner table. It goes well with grilled options and balances out heavier main dishes. I think it would look cute as an appetizer, served in small glasses or ramekins.',
      'https://c.pxhere.com/photos/27/e2/salad_lenses_avocado_bowl_yam_healthy_food_vitamins-1215185.jpg!d',
      [new Ingredient('Lentils',250),
        new Ingredient('Avocado',0.5),
        new Ingredient('Carrot',2),
        new Ingredient('Parmezan',125)
      ])
  ];

  getRecipes(){
    return this.recipes.slice();
  }
  setRecipes(newRecipes : Recipe[]){
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe : Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index : number, newRecipe : Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
