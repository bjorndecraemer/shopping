import * as firebase from 'firebase';
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions'
import {Store} from "@ngrx/store";

@Injectable()
export class AuthService {

  authenticationChanged = new Subject<boolean>();

  constructor(private route : ActivatedRoute, private router : Router, private store : Store<fromApp.AppState>){}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new AuthActions.Signup());
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => {

              this.store.dispatch(new AuthActions.SetToken(token));

              this.router.navigate(['../'],{relativeTo : this.route});
              this.authenticationChanged.next(true);
            }
          )
        }
      )
      .catch(error => console.log(error));
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.store.dispatch(new AuthActions.Signin());
        console.log(response);
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => {

            this.store.dispatch(new AuthActions.SetToken(token));

            this.router.navigate(['../'],{relativeTo : this.route});
            this.authenticationChanged.next(true);
          }
        )
      })
      .catch(error => console.log(error));

  }

  logout(){
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
    this.authenticationChanged.next(false);
  }
}
