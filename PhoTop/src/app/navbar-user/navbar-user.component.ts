import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

}
