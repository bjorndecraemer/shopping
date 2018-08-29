import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import {Store} from "@ngrx/store";


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  loading = false;

  private loadingChangedSubscription : Subscription;

  authState : Observable<fromAuth.State> ;

  constructor(private dataStorageService: DataStorageService, private store : Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.loading = !this.dataStorageService.initialRecipesLoaded;
    this.loadingChangedSubscription = this.dataStorageService.shoppingListDataLoadingChanged.subscribe(
      (loadingBusy: boolean) => {
        this.loading = loadingBusy;
      }
    )
  }

  ngOnDestroy(){
    if (this.loadingChangedSubscription) this.loadingChangedSubscription.unsubscribe();
  }

}
