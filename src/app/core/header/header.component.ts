import {Component} from "@angular/core";
import {DataStorageService} from "../../shared/data-storage.service";
import {HttpResponse} from "@angular/common/http";
import {Recipe} from "../../recipes/recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  moduleId: 'module.id',
  selector: 'app-header',
  templateUrl: 'header.component.html'

})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService, public authService : AuthService) {
  }

  onSave() {
    this.dataStorageService.saveRecipes()
      .subscribe(
        (response: HttpResponse<Recipe[]>) => console.log(response),
        (error : HttpResponse<any>) => console.log(error)
      );
    this.dataStorageService.saveShoppingList()
      .subscribe(
        (response : HttpResponse<Ingredient[]>) => console.log(response),
        (error : HttpResponse<any>) => console.log(error)
      );
    ;
  }
  onLoad(){
    this.dataStorageService.loadRecipes();
    this.dataStorageService.loadShoppingList();
  }

  onLogout(){
    this.authService.logout();
  }

}
