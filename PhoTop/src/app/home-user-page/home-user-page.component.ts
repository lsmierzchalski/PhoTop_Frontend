import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User2 } from '../_models/user2';
import { HttpService } from '../_services/http.service';
import { Photo } from '../_models/photo';

@Component({
    selector: 'app-home-user-page',
    templateUrl: 'home-user-page.component.html',
    styleUrls: ['./home-user-page.component.css']
})
export class HomeUserPageComponent implements OnInit {

    user: User2;
    userPhotos: Photo[];

    constructor(
        private httpService: HttpService,
        private router: Router) {
    }

    ngOnInit() {
        this.loadUserData();
    }

    private loadUserData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.httpService.getUser(currentUser.user_id).subscribe(data => {
            console.log(data);
            if (!data.avatar) {
                data.avatar = 'default_avatar';
            }
            this.user = data;
        });

        this.loadUserPhoto();
    }

    private loadUserPhoto() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.httpService.getUserPhotos(currentUser.user_id).subscribe(data => {
            this.userPhotos = data;
        });
    }

    moreInfoAboutPhoto(photo_id: number) {
        const selectPhoto = new Photo();
        selectPhoto.photo_id = photo_id;
        localStorage.setItem('selectPhoto', JSON.stringify(selectPhoto));

        this.router.navigateByUrl('/wybrane-zdjecie');
    }

    deletePhoto(photo_id: number) {
        this.httpService.deletePhoto(photo_id).subscribe(data => {
            this.userPhotos = data;
            this.loadUserPhoto();
        });
    }
}
