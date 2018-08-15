import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients : Ingredient[] = [];
  loading = false;
  private ingredientsChangedSubscription : Subscription;
  private loadingChangedSubscription : Subscription;


  constructor(private shoppingListService: ShoppingListService, private dataStorageService : DataStorageService) {}

  ngOnInit() {
    this.loading = !this.dataStorageService.initialShoppingListLoaded;
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
  }

  ngOnDestroy(){
    this.ingredientsChangedSubscription.unsubscribe();
    this.loadingChangedSubscription.unsubscribe();
  }

  onEditItem(itemIndexNr : number){
    this.shoppingListService.startedEditing.next(itemIndexNr);
  }
}
