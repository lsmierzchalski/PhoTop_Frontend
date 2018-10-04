import { Component, OnInit, Injectable} from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDate, NgbDatepickerI18n, NgbCalendarPersian} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../_services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Photo } from '../_models/photo';

const WEEKDAYS_SHORT = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];
const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {
  getWeekdayShortName(weekday: number) { return WEEKDAYS_SHORT[weekday - 1]; }
  getMonthShortName(month: number) { return MONTHS[month - 1]; }
  getMonthFullName(month: number) { return MONTHS[month - 1]; }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}
@Component({
    selector: 'app-search-by-date-page',
    templateUrl: 'search-by-date-page.component.html',
    styleUrls: ['search-by-date-page.component.css'],
    providers: [
        {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
    ]
})
export class SearchByDatePageComponent implements OnInit {

    photos: Photo[] = [];

    model: NgbDateStruct;
    date: {year: number, month: number};

    hoveredDate: NgbDate;

    fromDate: NgbDate;
    toDate: NgbDate;

    constructor(private httpSerive: HttpService, calendar: NgbCalendar, private router: Router) {
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

    moreInfoAboutPhoto(photo_id: number) {
        const selectPhoto = new Photo();
        selectPhoto.photo_id = photo_id;
        localStorage.setItem('selectPhoto', JSON.stringify(selectPhoto));

        this.router.navigateByUrl('/wybrane-zdjecie');
    }
}
