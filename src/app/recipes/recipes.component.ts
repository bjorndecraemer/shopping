import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  loading = false;
  authenticated = false;
  private loadingChangedSubscription : Subscription;
  private authenticationChangedSubscription : Subscription;

  constructor(private dataStorageService : DataStorageService, private authService : AuthService){

  }

  ngOnInit() {
    this.loading = !this.dataStorageService.initialRecipesLoaded;
    this.authenticated = this.authService.isAuthenticated();
    this.loadingChangedSubscription = this.dataStorageService.shoppingListDataLoadingChanged.subscribe(
      (loadingBusy: boolean) => {
        this.loading = loadingBusy;
      }
    )
    this.authenticationChangedSubscription = this.authService.authenticationChanged.subscribe(
      (authenticatedChanged : boolean) => {
        this.authenticated = authenticatedChanged;
      }
    )
  }

  ngOnDestroy(){
    this.loadingChangedSubscription.unsubscribe();
    this.authenticationChangedSubscription.unsubscribe();
  }

}
