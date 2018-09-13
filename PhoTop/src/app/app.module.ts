import { platformBrowser } from '@angular/platform-browser/public_api';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { EditPrifileComponent } from './edit-prifile/edit-prifile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule, Routes } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppRoutingModule } from './app.routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    RejestracjaComponent,
    EditPrifileComponent,
    ChangePasswordComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
