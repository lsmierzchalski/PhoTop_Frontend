import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditPrifileComponent } from './edit-profile/edit-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HomeUserPageComponent } from './home-user-page/home-user-page.component';
import { RankComponent } from './rank/rank.component';
import { SearchByDatePageComponent } from './search-by-date-page/search-by-date-page.component';
import { AddPhotoPageComponent } from './add-photo-page/add-photo-page.component';
import { PhotosPageComponent } from './photos-page/photos-page.component';
import { SearchByTagPageComponent } from './search-by-tag-page/search-by-tag-page.component';
import { SearchByTagPhotosPageComponent } from './search-by-tag-photos-page/search-by-tag-photos-page.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { SearchPhotoComponent } from './search-photo/search-photo.component';

import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [

    { path: '', redirectTo: '/strona-domowa', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'logowanie', component: LoginComponent },
    { path: 'rejestracja', component: RegisterComponent },
    { path: 'ranking', component: RankComponent, canActivate: [AuthGuard] },
    { path: 'szukaj-wedlug-daty', component: SearchByDatePageComponent, canActivate: [AuthGuard] },
    { path: 'dodaj-zdjecie', component: AddPhotoPageComponent, canActivate: [AuthGuard] },
    { path: 'edycja-profilu', component: EditPrifileComponent, canActivate: [AuthGuard] },
    { path: 'wybrane-zdjecie', component: PhotosPageComponent, canActivate: [AuthGuard] },
    { path: 'szukaj-wedlug-tagu', component: SearchByTagPageComponent, canActivate: [AuthGuard] },
    { path: 'szukaj-wedlug-tagu-zdjec', component: SearchByTagPhotosPageComponent, canActivate: [AuthGuard] },
    // { path: 'zmiana-h', component: ChangePasswordComponent },
    { path: 'strona-domowa', component: HomeUserPageComponent, canActivate: [AuthGuard] },
    { path: 'edycja-zdjecia', component: EditPhotoComponent, canActivate: [AuthGuard] },
    { path: 'szukaj-wedlug-nazwy', component: SearchPhotoComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})

export class AppRoutingModule { }
