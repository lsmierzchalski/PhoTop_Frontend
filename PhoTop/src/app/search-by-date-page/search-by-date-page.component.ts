import { Component, OnInit, Injectable} from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDate, NgbDatepickerI18n, NgbCalendarPersian} from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from '../_services/http.service';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { Photo } from '../_models/photo';

const WEEKDAYS_SHORT = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];
const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

@Component({
    selector: 'app-search-by-date-page',
    templateUrl: 'search-by-date-page.component.html',
    styleUrls: ['search-by-date-page.component.css']
})
export class SearchByDatePageComponent implements OnInit {

    photos: Photo[] = [];

    hoveredDate: NgbDate;

    fromDate: NgbDate;
    toDate: NgbDate;

    constructor(private httpSerive: HttpService, calendar: NgbCalendar) {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    ngOnInit() {
        this.loadPhotosByDate();
    }

    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }

        if (this.toDate != null && this.fromDate != null) {
            this.loadPhotosByDate();
        }
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    }

    private loadPhotosByDate() {
        this.httpSerive.getPhotosBetweenDate(this.fromDate, this.toDate).subscribe(photos => {
            this.photos = photos;
        });
    }
}
