import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routing }        from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AlertComponent } from './directives/alert.component';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthService } from './services/auth.service';
import { PlanetService } from './services/planet.service';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [
    AlertService,
    AuthService,
    AuthenticationService,
    PlanetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
