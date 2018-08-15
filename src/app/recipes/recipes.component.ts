import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  loading = false;
  private loadingChangedSubscription : Subscription;

  constructor(private dataStorageService : DataStorageService){

  }

  ngOnInit() {
    this.loading = !this.dataStorageService.initialRecipesLoaded;
    this.loadingChangedSubscription = this.dataStorageService.shoppingListDataLoadingChanged.subscribe(
      (loadingBusy: boolean) => {
        this.loading = loadingBusy;
      }
    )
  }

}
