import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "./ingredient.model";
import {map} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable()
export class DataStorageService{

  private headers = new HttpHeaders({'Content-Type' : 'application/json'});
  recipeDataLoadingChanged = new Subject<boolean>();
  initialRecipesLoaded = false;
  shoppingListDataLoadingChanged = new Subject<boolean>();
  initialShoppingListLoaded = false;

  constructor(private http : HttpClient, private recipeService : RecipeService, private shoppingListService : ShoppingListService){}

  loadRecipes(){
    this.recipeDataLoadingChanged.next(true);
    return this.http.get('https://ng-recipe-book-436f3.firebaseio.com/recipes.json')
      .pipe(map(
        (response : Recipe[]) => {
          if(response){
            for(let recipe of response){
              if(!recipe['ingredients']){
                recipe['ingredients'] = [];
              }
            }
          }
      return response;
    }))
      .subscribe(
        (response : Recipe[])=>{
          console.log(response);
          this.recipeService.setRecipes(response);
          this.recipeDataLoadingChanged.next(false);
          this.initialRecipesLoaded = true;
        },
        (error : HttpResponse<any>) => {
          console.log(error)
          this.recipeDataLoadingChanged.next(false);
        }
      )
  }

  saveRecipes(){
    return this.http.put('https://ng-recipe-book-436f3.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {headers : this.headers});
  }

  loadShoppingList(){
    this.shoppingListDataLoadingChanged.next(true);
    return this.http.get('https://ng-recipe-book-436f3.firebaseio.com/shoppingList.json')
      .subscribe(
        (response : Ingredient[]) => {
          console.log(response);
          this.shoppingListService.setIngredients(response);
          this.shoppingListDataLoadingChanged.next(false);
          this.initialShoppingListLoaded = true;
        },
      (error : HttpResponse<any>) => {
        console.log(error)
        this.shoppingListDataLoadingChanged.next(false);
      }
      );
  }

  saveShoppingList(){
    return this.http.put('https://ng-recipe-book-436f3.firebaseio.com/shoppingList.json',this.shoppingListService.getIngredients(), {headers : this.headers})
  }


}
