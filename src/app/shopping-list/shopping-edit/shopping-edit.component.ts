import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef : ElementRef;
  @ViewChild('amountInput') amountInputRef : ElementRef;
  @Output() addedNewIngredient = new EventEmitter<Ingredient>()

  constructor() { }

  ngOnInit() {
  }

  onAddIngredient(){
    let ingName = this.nameInputRef.nativeElement.value;
    let ingAmount = this.amountInputRef.nativeElement.value;
    this.addedNewIngredient.emit(new Ingredient(ingName,ingAmount));
  }

}
