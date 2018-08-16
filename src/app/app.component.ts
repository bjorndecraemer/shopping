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
      apiKey: "AIzaSyBXhHePBFDIWUTYKvaca2x2PbTrL94u-cY",
      authDomain: "ng-recipe-book-436f3.firebaseapp.com",
      databaseURL: "https://ng-recipe-book-436f3.firebaseio.com",
      projectId: "ng-recipe-book-436f3",
      storageBucket: "ng-recipe-book-436f3.appspot.com",
      messagingSenderId: "264100051171"
    }) ;
    this.authenticationChangedSubscription = this.authService.authenticationChanged.subscribe((authenticated : boolean) => {
      if(authenticated){
        this.dataStorageService.loadShoppingList();
        this.dataStorageService.loadRecipes();
        this.authenticationChangedSubscription.unsubscribe();
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
