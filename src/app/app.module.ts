import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminLandingComponent } from './components/admin-landing/admin-landing.component';
import { UserLandingComponent } from './components/user-landing/user-landing.component';
import { DataProviderLandingComponent } from './components/data-provider-landing/data-provider-landing.component';
import { ContributorComponent } from './components/contributor/contributor.component';

import { authInterceptorProviders } from './helpers/auth.interceptor'
import { PapaParseModule } from 'ngx-papaparse';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ChevronButtonComponent } from './components/chevron-button/chevron-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminLandingComponent,
    UserLandingComponent,
    DataProviderLandingComponent,
    ContributorComponent,
    ChevronButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PapaParseModule
  ],
  providers: [
    authInterceptorProviders,
    File,
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
