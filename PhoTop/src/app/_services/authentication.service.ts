import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs';
import * as jwt_decode from 'jwt-decode';
import { User } from '../_models/user';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(login: string, password: string) {
        const url = `${environment.photopApiUrl}login`;
        return this.http.post<any>(url, JSON.stringify({ login: login, password: password }), { observe: 'response' });
    }

    getUser(user_id: number) {
        const url = `${environment.photopApiUrl}users/${user_id}`;
        console.log(url);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('get user -> ', currentUser.token);
        return this.http.get(url);
    }

    login2(user_id: number) {

        const url = `${environment.photopApiUrl}users/${user_id}`;
        console.log(url);
        return this.http.get<User>(url)
            .pipe(map(user => {
                if (user) {
                    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    user.token = currentUser.token;

                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    postLogin(login: string, password: string): string {
        console.log(login + '-' + password);
        // this.http.post('http://localhost:8090/login',
        //   { 'login': login, 'password': password })
        //    .subscribe((response: any) => console.log(response.headers.get('Authorization')));

            const url = 'http://localhost:8090/login';

            this.http.post(url, JSON.stringify({ login: login, password: password }), { observe: 'response' })
              .subscribe((response: HttpResponse<any>) => {

                console.log(' ---- begin response ----');
                console.log( response );
                console.log(' ---- end response ----');

                const token = response.headers.get('Authorization');

                console.log(' ---- begin token ----');
                console.log ( token );
                console.log(' ---- end token ----');

                const pragma = response.headers.get('pragma');

                console.log(' ---- begin pragma ----');
                console.log ( pragma );
                console.log(' ---- end pragma ----');
              });
        return 'test';
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }
}
