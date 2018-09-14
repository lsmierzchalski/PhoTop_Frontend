import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditPrifileComponent } from './edit-prifile/edit-prifile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HomeUserPageComponent } from './home-user-page/home-user-page.component';

const routes: Routes = [

    { path: '', redirectTo: '/glowna', pathMatch: 'full' },
    { path: 'logowanie', component: LoginComponent },
    { path: 'rejestracja', component: RejestracjaComponent },
    { path: 'zmiana-h', component: ChangePasswordComponent },
    { path: 'edycja', component: EditPrifileComponent },
    { path: 'glowna', component: HomeComponent },
    { path: 'strona-domowa', component: HomeUserPageComponent },
    { path: '**', component: PageNotFoundComponent }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})

export class AppRoutingModule { }
