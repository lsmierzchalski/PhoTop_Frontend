import { platformBrowser } from '@angular/platform-browser/public_api';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { EditPrifileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeUserPageComponent } from './home-user-page/home-user-page.component';
import { RouterModule, Routes } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppRoutingModule } from './app.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { SearchByDatePageComponent } from './search-by-date-page/search-by-date-page.component';
import { AddPhotoPageComponent } from './add-photo-page/add-photo-page.component';
import { PhotosPageComponent } from './photos-page/photos-page.component';
import { SearchByTagPageComponent } from './search-by-tag-page/search-by-tag-page.component';

import { AlertComponent } from './_directives/alert.component';
import { AlertService } from './_services/alert.service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { RankComponent } from './rank/rank.component';
import { HttpService } from './_services/http.service';
import { FileUploadModule } from 'ng2-file-upload';
import {NgbModule, NgbRating, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    RegisterComponent,
    EditPrifileComponent,
    ChangePasswordComponent,
    PageNotFoundComponent,
    HomeComponent,
    HomeUserPageComponent,
    AlertComponent,
    NavbarUserComponent,
    RankComponent,
    SearchByDatePageComponent,
    AddPhotoPageComponent,
    PhotosPageComponent,
    SearchByTagPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FileUploadModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'photop', upload_preset: 'sch0n8mv'}),
  ],
  exports: [
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
