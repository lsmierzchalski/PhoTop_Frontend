import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.css']
})
export class RejestracjaComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signup(formData: NgForm) {
    this.authService.signup(formData.value.pseudonim, formData.value.email, formData.value.password);
  }

}
