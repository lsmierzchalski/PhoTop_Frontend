import { Injectable } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(email: string, password: string) {
    console.log('logowanie', email, password);
    if (email === 'a' && password === 'a') {
      this.router.navigate(['glowna']);
    }
  }

  signup(pseudonim: string, email: string, password: string) {
    console.log(pseudonim, email, password);
  }

  logout() { }
}
