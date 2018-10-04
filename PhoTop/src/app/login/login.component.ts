import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { HttpService } from '../_services/http.service';
import { User } from '../_models/user';


@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    user: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private httpService: HttpService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/ranking';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        console.log(this.returnUrl);
        this.loading = true;
        // this.authenticationService.postLogin(this.f.login.value, this.f.password.value);
        this.authenticationService.login(this.f.login.value, this.f.password.value)
            .subscribe(
                (response: HttpResponse<any>) => {
                    const token = response.headers.get('Authorization');
                    console.log('token:', token);
                    const decodeToken = this.authenticationService.getDecodedAccessToken(token);
                    console.log('userid:', decodeToken.userId);
                    const user = new User();
                    user.user_id = decodeToken.userId;
                    user.token = token;
                    user.login = decodeToken.sub;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(user);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error('Login lub hasło jest niepoprawny.');
                    this.loading = false;
                });

        // console.log(this.user);
        // console.log(JSON.parse(localStorage.getItem('currentUser')));
    }
}
