import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm : NgForm ;
  slEditingSubscription : Subscription;
  editMode = false;

  editedItem : Ingredient;

  constructor( private store : Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('shoppingList')
      .subscribe( data => {
        if(data.editedIngredientIndex > -1){
          this.editedItem = data.editedIngredient
          this.editMode = true;
          this.shoppingListForm.setValue({
            name : this.editedItem.name,
            amount : this.editedItem.amount
          })
        }
      })
  }

  onAddIngredient(form : NgForm){
    const value = form.value;
    const ingredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ ingredient : ingredient}));
      //this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    }
    else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
      //this.shoppingListService.addIngredient(new Ingredient(value.name,value.amount));
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
