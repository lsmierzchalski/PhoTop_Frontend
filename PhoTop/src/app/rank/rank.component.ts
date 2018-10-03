import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Photo } from '../_models/photo';

@Component({
    selector: 'app-rank',
    templateUrl: 'rank.component.html'
})
export class RankComponent implements OnInit {

    photos: Photo[] = [];

    constructor(private httpSerive: HttpService) {
    }

    ngOnInit() {
        this.loadAllPhotos();
    }

    private loadAllPhotos() {
        this.httpSerive.getPhotos().subscribe(photos => {
            this.photos = photos;
        });
    }
}
