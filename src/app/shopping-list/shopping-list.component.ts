import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients : Ingredient[] = [];
  loading = false;
  authenticated = false;
  private ingredientsChangedSubscription : Subscription;
  private loadingChangedSubscription : Subscription;
  private authChangedSubscription : Subscription;


  constructor(private shoppingListService: ShoppingListService, private dataStorageService : DataStorageService, private authService : AuthService) {}

  ngOnInit() {
    this.loading = !this.dataStorageService.initialShoppingListLoaded;
    this.authenticated = this.authService.isAuthenticated();
    console.log("authenticated : "+this.authenticated);
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[])=> {
        this.ingredients = ingredients;
      }

    );
    this.loadingChangedSubscription = this.dataStorageService.shoppingListDataLoadingChanged.subscribe(
      (loadingBusy: boolean) => {
        this.loading = loadingBusy;
      }
    )
    this.authChangedSubscription = this.authService.authenticationChanged.subscribe((authenticatedValue : boolean) => {
      this.authenticated = authenticatedValue;
    })
  }

  ngOnDestroy(){
    this.ingredientsChangedSubscription.unsubscribe();
    this.loadingChangedSubscription.unsubscribe();
    this.authChangedSubscription.unsubscribe();
  }

  onEditItem(itemIndexNr : number){
    this.shoppingListService.startedEditing.next(itemIndexNr);
  }
}
