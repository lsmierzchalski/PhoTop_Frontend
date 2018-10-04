import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Photo } from '../_models/photo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-rank',
    templateUrl: 'rank.component.html'
})
export class RankComponent implements OnInit {

    photos: Photo[] = [];

    constructor(
        private httpSerive: HttpService,
        private router: Router) {
    }

    ngOnInit() {
        this.loadAllPhotos();
    }

    private loadAllPhotos() {
        this.httpSerive.getPhotos().subscribe(photos => {
            this.photos = photos;
        });
    }

    moreInfoAboutPhoto(photo_id: number) {
        const selectPhoto = new Photo();
        selectPhoto.photo_id = photo_id;
        localStorage.setItem('selectPhoto', JSON.stringify(selectPhoto));

        this.router.navigateByUrl('/wybrane-zdjecie');
    }
}
