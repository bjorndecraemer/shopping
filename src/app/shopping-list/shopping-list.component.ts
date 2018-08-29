import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  shoppingListState : Observable<{ingredients: Ingredient[]}>;
  authState : Observable<fromAuth.State> ;

  loading = false;
  authenticated = false;
  private loadingChangedSubscription : Subscription;


  constructor(private shoppingListService: ShoppingListService, private store : Store<fromApp.AppState>, private dataStorageService : DataStorageService, private authService : AuthService) {}

  ngOnInit() {
    this.loading = !this.dataStorageService.initialShoppingListLoaded;
    this.authState = this.store.select('auth');

    this.shoppingListState = this.store.select('shoppingList');
    this.loadingChangedSubscription = this.dataStorageService.shoppingListDataLoadingChanged.subscribe(
      (loadingBusy: boolean) => {
        this.loading = loadingBusy;
      }
    )
  }

  ngOnDestroy(){
    this.loadingChangedSubscription.unsubscribe();
  }

  onEditItem(itemIndexNr : number){
    this.store.dispatch(new ShoppingListActions.StartEdit(itemIndexNr));
  }
}
