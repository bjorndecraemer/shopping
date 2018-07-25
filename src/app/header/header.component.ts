import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  moduleId : 'module.id',
  selector : 'app-header',
  templateUrl : 'header.component.html'

})
export class HeaderComponent{

  @Output() recipesSelected = new EventEmitter();
  @Output() shoppingSelected = new EventEmitter();

  onRecipesSelected(){
    this.recipesSelected.emit();
  }

  onShoppingSelected(){
    this.shoppingSelected.emit();
  }

}
