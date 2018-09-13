import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { ZmianaHComponent } from './zmiana-h/zmiana-h.component';
import { EdycjaComponent } from './edycja/edycja.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GlownaComponent } from './glowna/glowna.component';

const routes: Routes = [

    { path: '', redirectTo: '/glowna', pathMatch: 'full' },
    { path: 'logowanie', component: LogowanieComponent },
    { path: 'rejestracja', component: RejestracjaComponent },
    { path: 'zmiana-h', component: ZmianaHComponent },
    { path: 'edycja', component: EdycjaComponent },
    { path: 'glowna', component: GlownaComponent },
    { path: '**', component: PageNotFoundComponent }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]


})

export class AppRoutingModule { }
