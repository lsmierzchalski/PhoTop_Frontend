import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditPrifileComponent } from './edit-prifile/edit-prifile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HomeUserPageComponent } from './home-user-page/home-user-page.component';
import { RankComponent } from './rank/rank.component';
import { SearchByDatePageComponent } from './search-by-date-page/search-by-date-page.component';
import { AddPhotoPageComponent } from './add-photo-page/add-photo-page.component';

const routes: Routes = [

    { path: '', redirectTo: '/strona-domowa', pathMatch: 'full' },
    { path: 'logowanie', component: LoginComponent },
    { path: 'rejestracja', component: RegisterComponent },
    { path: 'ranking', component: RankComponent },
    { path: 'szukaj-wedlug-daty', component: SearchByDatePageComponent },
    { path: 'dodaj-zdjecie', component: AddPhotoPageComponent },
    // { path: 'zmiana-h', component: ChangePasswordComponent },
    { path: 'edycja', component: EditPrifileComponent },
    { path: 'glowna', component: HomeComponent },
    { path: 'strona-domowa', component: HomeUserPageComponent },
    { path: '**', component: PageNotFoundComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})

export class AppRoutingModule { }
