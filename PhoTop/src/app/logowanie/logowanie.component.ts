import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password);
  }
}
