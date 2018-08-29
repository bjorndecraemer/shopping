import {Component, OnInit} from "@angular/core";
import {DataStorageService} from "../../shared/data-storage.service";
import {HttpResponse} from "@angular/common/http";
import {Recipe} from "../../recipes/recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {AuthService} from "../../auth/auth.service";
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  moduleId: 'module.id',
  selector: 'app-header',
  templateUrl: 'header.component.html'

})
export class HeaderComponent implements OnInit {

  authState : Observable<fromAuth.State> ;

  constructor(private dataStorageService: DataStorageService, public authService : AuthService, private store : Store<fromApp.AppState>) {
  }

  ngOnInit(){
    this.authState = this.store.select('auth');
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
