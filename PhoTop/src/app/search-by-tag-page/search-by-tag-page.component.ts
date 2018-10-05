import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../_services/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-search-by-tag-page',
    templateUrl: 'search-by-tag-page.component.html',
    styleUrls: ['search-by-tag-page.component.css']
})
export class SearchByTagPageComponent implements OnInit {

    placeholderDate = 'Od rrrr-mm-dd Do rrrr-mm-dd';

    constructor(
        private httpSerive: HttpService,
         private router: Router) {
    }

    ngOnInit() {
    }

    // moreInfoAboutPhoto(photo_id: number) {
    //     const selectPhoto = new Photo();
    //     selectPhoto.photo_id = photo_id;
    //     localStorage.setItem('selectPhoto', JSON.stringify(selectPhoto));

    //     const selectDate = new SelectDate();
    //     selectDate.fromDate = this.fromDate;
    //     selectDate.toDate = this.toDate;
    //     localStorage.setItem('selectDate', JSON.stringify(selectDate));
    //     this.router.navigateByUrl('/wybrane-zdjecie');
    // }
}
