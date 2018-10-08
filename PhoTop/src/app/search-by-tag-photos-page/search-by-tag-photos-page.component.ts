import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Photo } from '../_models/photo';
import { Router, ActivatedRoute } from '@angular/router';
import { Tag } from '../_models/tag';

@Component({
    selector: 'app-search-by-tag-photos-page',
    templateUrl: 'search-by-tag-photos-page.component.html',
    styleUrls: ['search-by-tag-photos-page.component.css']
})
export class SearchByTagPhotosPageComponent implements OnInit {

    photos: Photo[] = [];
    selectTag: Tag;

    constructor(
        private httpSerive: HttpService,
        private router: Router) {
    }

    ngOnInit() {
        this.loadAllPhotos();
    }

    private loadAllPhotos() {
        this.selectTag = JSON.parse(localStorage.getItem('selectTag'));
        if (this.selectTag && this.selectTag.name) {
            console.log(this.selectTag.name);
            this.httpSerive.getPhotosWithTag(this.selectTag.name).subscribe(photos => {
                this.photos = photos;
            });
        }
    }

    moreInfoAboutPhoto(photo_id: number) {
        const selectPhoto = new Photo();
        selectPhoto.photo_id = photo_id;
        localStorage.setItem('selectPhoto', JSON.stringify(selectPhoto));

        this.router.navigateByUrl('/wybrane-zdjecie');
    }
}
