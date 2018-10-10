import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { User } from '../_models/user';

@Component({
  selector: 'app-navbar-user-to-search',
  templateUrl: './navbar-user-to-search.component.html',
  styleUrls: ['./navbar-user-to-search.component.css']
})
export class NavbarUserToSearchComponent implements OnInit {

  currentUser: User;

  @Output()
  eventTask = new EventEmitter<string>();

  constructor() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges): void {
      console.log('xd');
  }

}
