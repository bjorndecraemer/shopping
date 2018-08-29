import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {ServerModule} from "@angular/platform-server";
import {AppModule} from "./app.module";
import {ModuleMapLoaderModule} from "@nguniversal/module-map-ngfactory-loader"

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // Add .withServerTransition() to support Universal rendering.
    // The application ID can be any identifier which is unique on
    // the page.
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ]
})
export class AppServerModule{}
