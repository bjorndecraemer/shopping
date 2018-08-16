import * as firebase from 'firebase';
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {

  token: string;
  authenticationChanged = new Subject<boolean>();

  constructor(private route : ActivatedRoute, private router : Router){}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response)
        this.signInUser(email, password)
      })
      .catch(error => console.log(error));
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => {
            this.router.navigate(['../'],{relativeTo : this.route});
            this.token = token;
            this.authenticationChanged.next(true);
          }
        )
      })
      .catch(error => console.log(error));

  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
