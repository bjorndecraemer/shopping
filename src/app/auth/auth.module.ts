import {NgModule} from "@angular/core";
import {SignupComponent} from "./signup/signup.component";
import {SigninComponent} from "./signin/signin.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations : [
    SignupComponent,
    SigninComponent],
  imports : [
    FormsModule,
    AuthRoutingModule]
})
export class AuthModule{}
