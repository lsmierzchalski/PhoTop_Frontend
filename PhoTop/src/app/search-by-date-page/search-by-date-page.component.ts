import { Component, OnInit, Injectable } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../_services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Photo } from '../_models/photo';
import { SelectDate } from '../_models/select_date';

const WEEKDAYS_SHORT = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];
const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {
    getWeekdayShortName(weekday: number) { return WEEKDAYS_SHORT[weekday - 1]; }
    getMonthShortName(month: number) { return MONTHS[month - 1].substring(0, 3); }
    getMonthFullName(month: number) { return MONTHS[month - 1]; }
    getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}
@Component({
    selector: 'app-search-by-date-page',
    templateUrl: 'search-by-date-page.component.html',
    styleUrls: ['search-by-date-page.component.css'],
    providers: [
        { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
    ]
})
export class SearchByDatePageComponent implements OnInit {

    photos: Photo[] = [];

    modelFromDate;
    modelToDate;
    model: NgbDateStruct;
    date: { year: number, month: number };

    hoveredDate: NgbDate;

    fromDate: NgbDate;
    toDate: NgbDate;

    placeholderDate = 'Od rrrr-mm-dd Do rrrr-mm-dd';

    constructor(
        private httpSerive: HttpService,
        private calendar: NgbCalendar,
        private router: Router,
        config: NgbDatepickerConfig) {
        const selectDate = JSON.parse(localStorage.getItem('selectDate'));
        if (selectDate) {
            this.fromDate = selectDate.fromDate;
            this.toDate = selectDate.toDate;
        } else {
            this.fromDate  = calendar.getPrev(calendar.getToday(), 'd', 10);
            this.toDate = calendar.getToday();
        }
        config.minDate = {year: 2000, month: 1, day: 1};
        config.maxDate = calendar.getToday();
    }

    ngOnInit() {
        this.loadPhotosByDate();
        this.changePlaceholder();
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
            this.changePlaceholder();
        }
    }

    private changePlaceholder() {
        // tslint:disable-next-line:max-line-length
        this.placeholderDate = `Od ${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day} Do ${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`;
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

    isFuture(date: NgbDate) {
        return date.after(this.calendar.getToday());
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

        const selectDate = new SelectDate();
        selectDate.fromDate = this.fromDate;
        selectDate.toDate = this.toDate;
        localStorage.setItem('selectDate', JSON.stringify(selectDate));
        this.router.navigateByUrl('/wybrane-zdjecie');
    }
}
