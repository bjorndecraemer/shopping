import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "./shared/data-storage.service";
import * as firebase from 'firebase';
import {Subscription} from "rxjs";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  private authenticationChangedSubscription : Subscription;

  constructor(private authService : AuthService, private dataStorageService : DataStorageService){}

  ngOnInit(){

    firebase.initializeApp({
      
    }) ;

    this.authenticationChangedSubscription = this.authService.authenticationChanged.subscribe((authenticated : boolean) => {
      if(authenticated){
        this.dataStorageService.loadShoppingList();
        this.dataStorageService.loadRecipes();
        //this.authenticationChangedSubscription.unsubscribe();
      }
    })

    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    //   .then(function() {
    //     console.log("Persistence set!")
    //   })
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     console.log(error);
    //   });
    //console.log(firebase.apps);

  }
  ngOnDestroy(){
    this.authenticationChangedSubscription.unsubscribe();
  }

}
