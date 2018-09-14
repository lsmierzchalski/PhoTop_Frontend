import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // jesli uzytkownik jest zalogowany funkcja zwraca prawde
            return true;
        }

        // jesli nie jest zalogwany nastepuje przekierowanie do strony logowania
        this.router.navigate(['/logowanie'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
