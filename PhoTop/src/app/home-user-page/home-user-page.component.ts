import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-home-user-page',
    templateUrl: 'home-user-page.component.html',
    styleUrls: ['./home-user-page.component.css']
})
export class HomeUserPageComponent implements OnInit {

    currentUser: User;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }
}
