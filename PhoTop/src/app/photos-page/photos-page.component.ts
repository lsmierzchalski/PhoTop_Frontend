import { Component, OnInit } from '@angular/core';

import { User2 } from '../_models/user2';
import { HttpService } from '../_services/http.service';
import { Photo2 } from '../_models/photo2';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-photos-page',
    templateUrl: 'photos-page.component.html',
    styleUrls: ['./photos-page.component.css'],
    providers: [NgbRatingConfig]
})
export class PhotosPageComponent implements OnInit {

    photoAutor: User2;
    selectPhotos: Photo2;
    currentRate = 0;

    constructor(
        private httpService: HttpService,
        private config: NgbRatingConfig,
        private router: Router) {
            this.loadSelectPhotoData();
            config.max = 5;
    }

    ngOnInit() {
    }

    private loadSelectPhotoData() {
        const selectPhotos = JSON.parse(localStorage.getItem('selectPhoto'));
        console.log(selectPhotos);
        console.log('selectphotos: ', selectPhotos.photo_id);

        this.httpService.getPhotoWithUserRating(selectPhotos.photo_id).subscribe(data => {
            console.log(data);
            if (data.currentUserRating != null) {
                this.currentRate = data.currentUserRating;
            }
            this.selectPhotos = data;
        });

        // this.httpService.getUserPhotos(currentUser.user_id).subscribe(data => {
        //     this.selectPhotos = data;
        // });
    }

    postRatingUser(currentRate: number) {
        console.log(currentRate);
        console.log(this.currentRate);
        this.config.readonly = true;
        this.httpService.putRating(this.selectPhotos.photo_id, currentRate).subscribe(data => {
            console.log('test', data);
            this.config.readonly = false;
            this.loadSelectPhotoData();
        }, error => {
            console.log('test', error);
            this.config.readonly = false;
            this.loadSelectPhotoData();
        });
    }
}
