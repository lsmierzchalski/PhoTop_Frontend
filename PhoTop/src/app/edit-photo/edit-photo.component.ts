import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { Photo } from '../_models/photo';
import { Title } from '@angular/platform-browser';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {

  photoGroup: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private alertService: AlertService) {

  }

  ngOnInit() {
    this.newMethod();
  }

  private newMethod() {
    this.photoGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  get f() { return this.photoGroup.controls; }


  onSubmit() {

    this.submitted = true;

    if (this.photoGroup.invalid) {
      return;
    }
    // TODO: Use EventEmitter with form value
    console.log(this.photoGroup.value.title);
    console.log(this.photoGroup.value.description);

    const selectPhotos = JSON.parse(localStorage.getItem('selectPhoto'));
    console.log(selectPhotos);
    console.log('selectphotos: ', selectPhotos.photo_id);
    // tslint:disable-next-line:max-line-length
    this.httpService.editPhotoData(selectPhotos.photo_id, this.photoGroup.value.title, this.photoGroup.value.description).subscribe(data => {
      this.alertService.success('Edycja powiodła się', true);
      this.router.navigate(['/strona-domowa']);
    },
      error => {
        this.alertService.error('Edycja profilu nie powiodła się.');
      });


    // this.httpService.editPhoto(selectPhotos.photo_id, this.photoGroup.value.title, this.photoGroup.value.description).subscribe(data => {

    // });


  }




}

